auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadEvents();
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-content').classList.add('hidden');
    }
});

function loadEvents() {
    getItems('events', (items) => {
        const list = document.getElementById('events-list');
        list.innerHTML = '';
        items.forEach(([id, item]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td class="p-2">${item.title || ''}</td>
                        <td class="p-2">${item.desc || ''}</td>
                        <td class="p-2">${item.date || ''}</td>
                        <td class="p-2">${item.image ? '<img src="' + item.image + '" width="50">' : 'لا صورة'}</td>
                        <td class="p-2">
                            <button onclick="editEvent('${id}', '${item.title || ''}', '${item.desc || ''}', '${item.date || ''}', '${item.image || ''}')" class="bg-yellow-600 text-white px-2 py-1 rounded">تعديل</button>
                            <button onclick="deleteItem('events', '${id}')" class="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
                        </td>
                    `;
            list.appendChild(row);
        });
    });
}

const form = document.getElementById('event-form');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-edit');
const idInput = document.getElementById('event-id');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('event-title').value,
        desc: document.getElementById('event-desc').value,
        date: document.getElementById('event-date').value,
        image: document.getElementById('event-image').value
    };
    const eventId = idInput.value;
    if (eventId) {
        updateItem('events', eventId, data);
    } else {
        addItem('events', data);
    }
    resetForm();
    loadEvents();
});

function editEvent(id, title, desc, date, image) {
    idInput.value = id;
    document.getElementById('event-title').value = title;
    document.getElementById('event-desc').value = desc;
    document.getElementById('event-date').value = date;
    document.getElementById('event-image').value = image;
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