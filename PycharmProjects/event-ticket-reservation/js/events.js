async function loadEvents() {
    const eventList = document.getElementById('eventList');
    if (!eventList) return;
    eventList.innerHTML = '';
    const events = await db.collection('events').get();
    events.forEach(doc => {
        const event = doc.data();
        const card = `
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">
                            Date: ${event.date}<br>
                            Places: ${event.seats}<br>
                            Prix: ${event.price}€ (VIP: +${event.vipPrice}€)
                        </p>
                        <select id="category_${doc.id}" class="form-select mb-2">
                            <option value="standard">Standard</option>
                            <option value="vip">VIP</option>
                        </select>
                        <button class="btn btn-primary" onclick="reserveTicket('${doc.id}', 'acompte')">Payer un Acompte</button>
                        <button class="btn btn-success" onclick="reserveTicket('${doc.id}', 'complet')">Paiement Complet</button>
                    </div>
                </div>
            </div>`;
        eventList.innerHTML += card;
    });
}

async function reserveTicket(eventId, type) {
    const user = auth.currentUser;
    if (!user) {
        alert('Veuillez vous connecter.');
        return;
    }
    const category = document.getElementById(`category_${eventId}`).value;
    const eventDoc = await db.collection('events').doc(eventId).get();
    const event = eventDoc.data();
    if (event.seats <= 0) {
        alert('Aucune place disponible.');
        return;
    }

    const price = category === 'vip' ? event.price + event.vipPrice : event.price;
    const reservation = {
        userId: user.uid,
        eventId,
        category,
        type,
        price: type === 'acompte' ? price * 0.5 : price,
        status: type === 'acompte' ? 'en attente' : 'confirmée',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        paymentDue: type === 'acompte' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null
    };

    await db.collection('reservations').add(reservation);
    await db.collection('events').doc(eventId).update({ seats: event.seats - 1 });

    if (type === 'complet') {
        console.log('Paiement effectué');
        const qrData = `${user.uid}-${eventId}-${category}`;
        const qrCodeDiv = document.createElement('div');
        qrCodeDiv.id = `qr_${eventId}`;
        document.getElementById('reservationStatus').appendChild(qrCodeDiv);
        QRCode.toCanvas(qrCodeDiv, qrData, { width: 200 });
        console.log(`Confirmation envoyée pour la réservation de ${event.name}.`);
    } else {
        console.log(`Rappel de paiement envoyé pour la réservation de ${event.name}.`);
    }
    loadReservations();
}

async function loadReservations() {
    const user = auth.currentUser;
    if (!user) return;
    const reservationStatus = document.getElementById('reservationStatus');
    if (!reservationStatus) return;
    reservationStatus.innerHTML = '<h3>Vos Réservations</h3>';
    const reservations = await db.collection('reservations').where('userId', '==', user.uid).get();
    reservations.forEach(async doc => {
        const res = doc.data();
        const event = (await db.collection('events').doc(res.eventId).get()).data();
        reservationStatus.innerHTML += `
            <div class="alert alert-info">
                Événement: ${event.name}<br>
                Catégorie: ${res.category}<br>
                Statut: ${res.status}<br>
                Prix: ${res.price}€<br>
                ${res.status === 'en attente' ? `Paiement dû avant: ${res.paymentDue.toDate().toLocaleDateString()}` : ''}
            </div>`;
    });
}

document.getElementById('userMenu')?.addEventListener('click', () => {
    showSection('userSection');
    loadEvents();
    loadReservations();
});

if (window.location.pathname.includes('index.html')) {
    loadEvents();
}
