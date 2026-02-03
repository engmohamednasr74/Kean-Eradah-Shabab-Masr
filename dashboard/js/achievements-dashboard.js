auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadAchievements();
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-content').classList.add('hidden');
    }
});

function loadAchievements() {
    getItems('achievements', (items) => {
        const list = document.getElementById('achievements-list');
        list.innerHTML = '';
        items.forEach(([id, item]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td class="p-2">${item.title || ''}</td>
                        <td class="p-2">${item.desc || ''}</td>
                        <td class="p-2">${item.image ? '<img src="' + item.image + '" width="50">' : 'لا صورة'}</td>
                        <td class="p-2">
                            <button onclick="editAchievement('${id}', '${item.title || ''}', '${item.desc || ''}', '${item.image || ''}')" class="bg-yellow-600 text-white px-2 py-1 rounded">تعديل</button>
                            <button onclick="deleteItem('achievements', '${id}')" class="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
                        </td>
                    `;
            list.appendChild(row);
        });
    });
}

const form = document.getElementById('achievement-form');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-edit');
const idInput = document.getElementById('achievement-id');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('achievement-title').value,
        desc: document.getElementById('achievement-desc').value,
        image: document.getElementById('achievement-image').value
    };
    const achievementId = idInput.value;
    if (achievementId) {
        updateItem('achievements', achievementId, data);
    } else {
        addItem('achievements', data);
    }
    resetForm();
    loadAchievements();
});

function editAchievement(id, title, desc, image) {
    idInput.value = id;
    document.getElementById('achievement-title').value = title;
    document.getElementById('achievement-desc').value = desc;
    document.getElementById('achievement-image').value = image;
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