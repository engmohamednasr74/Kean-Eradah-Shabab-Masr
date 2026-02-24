db.ref('leadership').on('value', (snapshot) => {
    const container = document.getElementById('leadership-container');
    container.innerHTML = ''; // مسح القديم
    const data = snapshot.val() || {};
    Object.entries(data).forEach(([id, leadership]) => {
        const card = document.createElement('div');
        card.className = 'card-golden p-6 rounded-lg shadow-md text-center w-50'; // ستايل مشابه للموقع
        card.innerHTML = `
                <img src="${leadership.image || 'img/default-leadership.jpg'}" alt="${leadership.title}" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                <h3 class="text-xl font-bold mb-2">${leadership.title}</h3>
                <p class="text-muted-foreground mb-2">${leadership.desc}</p>
            `;
        container.appendChild(card);
    });
    if (Object.keys(data).length === 0) {
        container.innerHTML = '<p class="text-center text-muted-foreground">لا توجد قيادات حاليًا.</p>';
    }
});




