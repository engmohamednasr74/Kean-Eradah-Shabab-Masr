auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadTrainingInfo();
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-content').classList.add('hidden');
    }
});

function loadTrainingInfo() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const title = decodeURIComponent(params.get('title') || '');
    if (id && title) {
        document.getElementById('training-id').value = id;
        document.getElementById('training-title').textContent = title;
    } else {
        document.getElementById('admin-content').innerHTML = '<p class="text-red-600">خطأ: لم يتم العثور على التدريب!</p>';
    }
}

function generateCertificates() {
    const namesText = document.getElementById('attendees-names').value.trim();
    if (!namesText) {
        document.getElementById('error-message').classList.remove('hidden');
        return;
    }
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('loading').style.display = 'block';

    const names = namesText.split('\n').filter(name => name.trim());
    const { jsPDF } = window.jspdf;
    const templateUrl = 'https://i.postimg.cc/ZRdLwz8n/Whats-App-Image-2026-01-22-at-1-03-07-AM.jpg'; // غير برابط الشهادة الحقيقي

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = templateUrl;
    img.onload = function () {
        names.forEach((name) => {
            const pdf = new jsPDF('landscape', 'pt', 'a4');
            pdf.addImage(img, 'PNG', 0, 0, 842, 595); // حجم A4
            pdf.setFont("helvetica", "bold");
            pdf.addFileToVFS('Amiri-Regular.ttf', 'الـ base64 بتاع الخط هنا'); // استخدم online converter لـ base64
            pdf.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
            pdf.setFont('Amiri');
            pdf.setFontSize(24);
            pdf.setTextColor(0, 0, 255); // لون أزرق زي الشهادة
            pdf.text(name, 400, 270, { align: 'center' }); // مكان الاسم (عدل 421, 300 لو لازم)
            pdf.save(`شهادة_${name}.pdf`); // تحميل تلقائي
        });
        document.getElementById('loading').style.display = 'none';
    };
    img.onerror = function () {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error-message').textContent = 'خطأ: مشكلة في تحميل الشهادة!';
        document.getElementById('error-message').classList.remove('hidden');
    };
}