async function checkPendingReservations() {
    const now = new Date();
    const reservations = await db.collection('reservations').where('status', '==', 'en attente').get();
    reservations.forEach(async doc => {
        const res = doc.data();
        if (res.paymentDue.toDate() < now) {
            await db.collection('reservations').doc(doc.id).update({ status: 'annulée' });
            const event = await db.collection('events').doc(res.eventId).get();
            await db.collection('events').doc(res.eventId).update({ seats: event.data().seats + 1 });
            console.log(`Réservation ${doc.id} annulée : paiement non complété.`);
        } else if (res.paymentDue.toDate() - now < 24 * 60 * 60 * 1000) {
            console.log(`Rappel envoyé pour la réservation ${doc.id}.`);
        }
    });
}wsetInterval(checkPendingReservations, 60 * 1000);
