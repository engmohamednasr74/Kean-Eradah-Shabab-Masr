db.ref('achievements').on('value', (snapshot) => {
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';
    const data = snapshot.val() || {};
    Object.entries(data).forEach(([id, achievement]) => {
        const card = document.createElement('div');
        card.className = 'card-golden p-6 rounded-lg shadow-md';
        card.innerHTML = `
                <img src="${achievement.image || 'img/default-achievement.jpg'}" alt="${achievement.title}" class="w-full h-40 object-cover rounded mb-4">
                <h3 class="text-xl font-bold mb-2">${achievement.title}</h3>
                <p class="text-muted-foreground mb-2">${achievement.desc}</p>
            `;
        container.appendChild(card);
    });
    if (Object.keys(data).length === 0) {
        container.innerHTML = '<p class="text-center text-muted-foreground">لا توجد إنجازات حاليًا.</p>';
    }
});


db.ref('news').on('value', (snapshot) => {
    const container = document.getElementById('news-ticker');
    container.innerHTML = '';
    const data = snapshot.val() || {};
    const titles = Object.values(data).map(item => item.title).join(' - ');
    container.innerHTML = titles ? `<span>${titles}</span>` : 'لا توجد أخبار حاليًا.';
});