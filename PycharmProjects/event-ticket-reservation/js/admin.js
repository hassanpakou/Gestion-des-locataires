document.getElementById('createEvent')?.addEventListener('click', async () => {
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const seats = parseInt(document.getElementById('eventSeats').value);
    const price = parseFloat(document.getElementById('eventPrice').value);
    const vipPrice = parseFloat(document.getElementById('eventVipPrice').value);

    if (!name || !date || !seats || !price || !vipPrice) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    await db.collection('events').add({
        name,
        date,
        seats,
        price,
        vipPrice,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('Événement créé.');
    loadEvents();
});

async function loadUserManagement() {
    const userManagement = document.getElementById('userManagement');
    if (!userManagement) return;
    userManagement.innerHTML = '<h3>Gestion des Utilisateurs</h3>';
    const users = await db.collection('users').get();
    users.forEach(doc => {
        const user = doc.data();
        userManagement.innerHTML += `
            <div class="alert alert-light">
                Email: ${user.email}<br>
                Rôle: ${user.role}<br>
                <button class="btn CENT btn-sm" onclick="deleteUser('${doc.id}')">Supprimer</button>
            </div>`;
    });
}

async function deleteUser(userId) {
    await db.collection('users').doc(userId).delete();
    alert('Utilisateur supprimé.');
    loadUserManagement();
}

document.getElementById('adminMenu')?.addEventListener('click', () => {
    showSection('adminSection');
    loadUserManagement();
});
