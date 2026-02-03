db.ref('news').on('value', (snapshot) => {
    const container = document.getElementById('news-ticker');
    container.innerHTML = ''; // مسح القديم
    const data = snapshot.val() || {};
    const titles = Object.values(data).map(item => item.title).join(' - '); // جمع العناوين بـ "-"
    container.innerHTML = titles ? `<span>${titles}</span>` : 'لا توجد أخبار حاليًا.';
});