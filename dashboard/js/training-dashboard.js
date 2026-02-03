auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadTrainings();
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-content').classList.add('hidden');
    }
});

function loadTrainings() {
    getItems('training', (items) => {
        const list = document.getElementById('training-list');
        list.innerHTML = '';
        items.forEach(([id, item]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td class="p-2">${item.title || ''}</td>
                        <td class="p-2">${item.desc || ''}</td>
                        <td class="p-2">${item.image ? '<img src="' + item.image + '" width="50">' : 'لا صورة'}</td>
                        <td class="p-2">${item.status || ''}</td>
                        <td class="p-2">
                            <button onclick="editTraining('${id}', '${item.title || ''}', '${item.desc || ''}', '${item.image || ''}', '${item.status || ''}')" class="bg-yellow-600 text-white px-2 py-1 rounded">تعديل</button>
                            <button onclick="deleteItem('training', '${id}')" class="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
                            ${item.status === 'منتهي' ? '<button onclick="window.location.href=\'certificate-generator.html?id=' + id + '&title=' + encodeURIComponent(item.title) + '\'" class="bg-green-600 text-white px-2 py-1 rounded">طباعة شهادات</button>' : ''}
                        </td>
                    `;
            list.appendChild(row);
        });
    });
}

const form = document.getElementById('training-form');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-edit');
const idInput = document.getElementById('training-id');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('training-title').value,
        desc: document.getElementById('training-desc').value,
        image: document.getElementById('training-image').value,
        status: document.getElementById('training-status').value
    };
    const trainingId = idInput.value;
    if (trainingId) {
        updateItem('training', trainingId, data);
    } else {
        addItem('training', data);
    }
    resetForm();
    loadTrainings();
});

function editTraining(id, title, desc, image, status) {
    idInput.value = id;
    document.getElementById('training-title').value = title;
    document.getElementById('training-desc').value = desc;
    document.getElementById('training-image').value = image;
    document.getElementById('training-status').value = status;
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

function showCertificateSection(id, title) {
    document.getElementById('certificate-section').classList.remove('hidden');
    document.getElementById('selected-training-id').value = id;
    document.getElementById('selected-training-title').textContent = title;
    document.getElementById('attendees-names').value = '';
    window.scrollTo({ top: document.getElementById('certificate-section').offsetTop, behavior: 'smooth' });
}

function generateCertificates() {
    const namesText = document.getElementById('attendees-names').value.trim();
    if (!namesText) {
        alert('أدخل أسماء الحاضرين!');
        return;
    }
    const names = namesText.split('\n').filter(name => name.trim());

    const { jsPDF } = window.jspdf;
    const templateUrl = 'https://your-domain.com/path/to/certificate-template.png';

    names.forEach((name, index) => {
        const pdf = new jsPDF('landscape', 'pt', 'a4');
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = templateUrl;
        img.onload = function () {
            pdf.addImage(img, 'PNG', 0, 0, 842, 595);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(20);
            pdf.setTextColor(0, 0, 0);
            pdf.text(name, 421, 300, { align: 'center' });
            pdf.save(`شهادة_${name}.pdf`);
        };
    });
    alert('تم توليد الشهادات وتنزيلها!');
}