db.ref('news').on('value', (snapshot) => {
    const container = document.getElementById('news-ticker');
    container.innerHTML = '';
    const data = snapshot.val() || {};
    const titles = Object.values(data).map(item => item.title).join(' - ');
    container.innerHTML = titles ? `<span>${titles}</span>` : 'لا توجد أخبار حاليًا.';
});