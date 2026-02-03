db.ref('news').on('value', (snapshot) => {
    const container = document.getElementById('news-ticker');
    container.innerHTML = '';
    const data = snapshot.val() || {};
    const titles = Object.values(data).map(item => item.title).join(' - ');
    container.innerHTML = titles ? `<span>${titles}</span>` : 'لا توجد أخبار حاليًا.';
});



db.ref('training').on('value', (snapshot) => {
    const container = document.getElementById('training-container');
    container.innerHTML = '';
    const data = snapshot.val() || {};
    Object.entries(data).forEach(([id, training]) => {
        const card = document.createElement('div');
        card.className = 'card-golden p-6 rounded-lg shadow-md';
        card.innerHTML = `
                <img src="${training.image || 'img/default-training.jpg'}" alt="${training.title}" class="w-full h-40 object-cover rounded mb-4">
                <h3 class="text-xl font-bold mb-2">${training.title}</h3>
                <p class="text-muted-foreground mb-2">${training.desc}</p>
                <p class="text-sm text-accent">الحالة: ${training.status}</p>
            `;
        container.appendChild(card);
    });
    if (Object.keys(data).length === 0) {
        container.innerHTML = '<p class="text-center text-muted-foreground">لا توجد برامج تدريبية حاليًا.</p>';
    }
});