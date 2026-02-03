auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadNews(); // جلب البيانات
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-content').classList.add('hidden');
    }
});

function loadNews() {
    getItems('news', (items) => {
        const list = document.getElementById('news-list');
        list.innerHTML = '';
        items.forEach(([id, item]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td class="p-2">${item.title || ''}</td>
                        <td class="p-2">
                            <button onclick="editNews('${id}', '${item.title || ''}')" class="bg-yellow-600 text-white px-2 py-1 rounded">تعديل</button>
                            <button onclick="deleteItem('news', '${id}')" class="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
                        </td>
                    `;
            list.appendChild(row);
        });
    });
}

const form = document.getElementById('news-form');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-edit');
const idInput = document.getElementById('news-id');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('news-title').value
    };
    const newsId = idInput.value;
    if (newsId) {
        updateItem('news', newsId, data);
    } else {
        addItem('news', data);
    }
    resetForm();
    loadNews();
});

function editNews(id, title) {
    idInput.value = id;
    document.getElementById('news-title').value = title;
    submitBtn.textContent = 'تحديث';
    cancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    form.reset();
    idInput.value = '';
    submitBtn.textContent = 'إضافة';
    cancelBtn.classList.add('hidden');
}