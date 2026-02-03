auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadMedia();
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-content').classList.add('hidden');
    }
});

function loadMedia() {
    getItems('media', (items) => {
        const list = document.getElementById('media-list');
        list.innerHTML = '';
        items.forEach(([id, item]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td class="p-2">${item.title || ''}</td>
                        <td class="p-2">${item.desc || ''}</td>
                        <td class="p-2">${item.image ? '<img src="' + item.image + '" width="50">' : 'لا صورة'}</td>
                        <td class="p-2">
                            <button onclick="editMedia('${id}', '${item.title || ''}', '${item.desc || ''}', '${item.image || ''}')" class="bg-yellow-600 text-white px-2 py-1 rounded">تعديل</button>
                            <button onclick="deleteItem('media', '${id}')" class="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
                        </td>
                    `;
            list.appendChild(row);
        });
    });
}

const form = document.getElementById('media-form');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-edit');
const idInput = document.getElementById('media-id');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('media-title').value,
        desc: document.getElementById('media-desc').value,
        image: document.getElementById('media-image').value
    };
    const mediaId = idInput.value;
    if (mediaId) {
        updateItem('media', mediaId, data);
    } else {
        addItem('media', data);
    }
    resetForm();
    loadMedia();
});

function editMedia(id, title, desc, image) {
    idInput.value = id;
    document.getElementById('media-title').value = title;
    document.getElementById('media-desc').value = desc;
    document.getElementById('media-image').value = image;
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