async function loadOrganizerReservations() {
    const reservationList = document.getElementById('reservationList');
    if (!reservationList) return;
    reservationList.innerHTML = '<h3>Liste des Réservations</h3>';
    const reservations = await db.collection('reservations').get();
    reservations.forEach(async doc => {
        const res = doc.data();
        const event = (await db.collection('events').doc(res.eventId).get()).data();
        reservationList.innerHTML += `
            <div class="alert alert-secondary">
                Utilisateur: ${res.userId}<br>
                Événement: ${event.name}<br>
                Catégorie: ${res.category}<br>
                Statut: ${res.status}<br>
                Prix: ${res.price}€<br>
                ${res.status === 'en attente' ? `Paiement dû avant: ${res.paymentDue.toDate().toLocaleDateString()}` : ''}
                <button class="btn btn-danger btn-sm" onclick="cancelReservation('${doc.id}')">Annuler</button>
            </div>`;
    });
}

async function cancelReservation(reservationId) {
    const resDoc = await db.collection('reservations').doc(reservationId).get();
    const res = resDoc.data();
    await db.collection('reservations').doc(reservationId).update({ status: 'annulée' });
    const event = await db.collection('events').doc(res.eventId).get();
    await db.collection('events').doc(res.eventId).update({ seats: event.data().seats + 1 });
    console.log(`Réservation ${reservationId} annulée. Notification envoyée.`);
    loadOrganizerReservations();
}

document.getElementById('validateTicket')?.addEventListener('click', async () => {
    const qrInput = document.getElementById('qrInput').value;
    const [userId, eventId, category] = qrInput.split('-');
    const reservation = await db.collection('reservations')
        .where('userId', '==', userId)
        .where('eventId', '==', eventId)
        .where('category', '==', category)
        .get();
    if (!reservation.empty) {
        await reservation.docs[0].ref.update({ status: 'validée' });
        alert('Billet validé.');
    } else {
        alert('Billet invalide.');
    }
});

document.getElementById('organizerMenu')?.addEventListener('click', () => {
    showSection('organizerSection');
    loadOrganizerReservations();
});
