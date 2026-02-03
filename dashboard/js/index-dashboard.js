auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadProjects();
        loadGallery();
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-content').classList.add('hidden');
    }
});

function loadProjects() {
    getItems('projects', (items) => {
        const list = document.getElementById('projects-list');
        list.innerHTML = '';
        items.forEach(([id, item]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-2">${item.title || ''}</td>
                <td class="p-2">${item.image ? '<img src="' + item.image + '" width="80">' : 'لا صورة'}</td>
                <td class="p-2">
                    <button onclick="editProject('${id}', '${item.title || ''}', '${item.image || ''}')" class="bg-yellow-600 text-white px-2 py-1 rounded">تعديل</button>
                    <button onclick="deleteItem('projects', '${id}')" class="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
                </td>
            `;
            list.appendChild(row);
        });
    });
}

const projectForm = document.getElementById('project-form');
const projectSubmit = document.getElementById('project-submit');
const projectCancel = document.getElementById('project-cancel');
const projectId = document.getElementById('project-id');

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('project-title').value,
        image: document.getElementById('project-image').value
    };
    if (projectId.value) {
        updateItem('projects', projectId.value, data);
    } else {
        addItem('projects', data);
    }
    resetProjectForm();
    loadProjects();
});

function editProject(id, title, image) {
    projectId.value = id;
    document.getElementById('project-title').value = title;
    document.getElementById('project-image').value = image;
    projectSubmit.textContent = 'تحديث';
    projectCancel.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

projectCancel.addEventListener('click', resetProjectForm);
function resetProjectForm() {
    projectForm.reset();
    projectId.value = '';
    projectSubmit.textContent = 'إضافة';
    projectCancel.classList.add('hidden');
}

function loadGallery() {
    getItems('gallery', (items) => {
        const list = document.getElementById('gallery-list');
        list.innerHTML = '';
        items.forEach(([id, item]) => {
            const div = document.createElement('div');
            div.className = 'relative group';
            div.innerHTML = `
                        <img src="${item.image}" class="w-full h-40 object-cover rounded">
                        ${item.title ? '<p class="text-center mt-2">' + item.title + '</p>' : ''}
                        <div class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button onclick="editGallery('${id}', '${item.title || ''}', '${item.image}')" class="bg-yellow-600 text-white px-3 py-1 rounded">تعديل</button>
                            <button onclick="deleteItem('gallery', '${id}')" class="bg-red-600 text-white px-3 py-1 rounded">حذف</button>
                        </div>
                    `;
            list.appendChild(div);
        });
    });
}

const galleryForm = document.getElementById('gallery-form');
const gallerySubmit = document.getElementById('gallery-submit');
const galleryCancel = document.getElementById('gallery-cancel');
const galleryId = document.getElementById('gallery-id');

galleryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('gallery-title').value,
        image: document.getElementById('gallery-image').value
    };
    if (galleryId.value) {
        updateItem('gallery', galleryId.value, data);
    } else {
        addItem('gallery', data);
    }
    resetGalleryForm();
    loadGallery();
});

function editGallery(id, title, image) {
    galleryId.value = id;
    document.getElementById('gallery-title').value = title;
    document.getElementById('gallery-image').value = image;
    gallerySubmit.textContent = 'تحديث';
    galleryCancel.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

galleryCancel.addEventListener('click', resetGalleryForm);
function resetGalleryForm() {
    galleryForm.reset();
    galleryId.value = '';
    gallerySubmit.textContent = 'إضافة';
    galleryCancel.classList.add('hidden');
}