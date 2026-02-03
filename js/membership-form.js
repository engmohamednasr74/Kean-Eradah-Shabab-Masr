document.getElementById('governorate')
document.getElementById('fullName')
document.getElementById('phone')
document.getElementById('nationalId')
document.getElementById('qualification')
document.getElementById('committee')
document.getElementById('skills')

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('membershipForm');
    const governorateSelect = document.getElementById('governorate');

    const whatsappNumbers = {
        'القاهرة':          '01000048381',   
        'الجيزة':           '01000048381',
        'الإسكندرية':       '01000048381',
        'الدقهلية':         '01000048381',
        'الشرقية':          '01000048381',
        'الغربية':          '01000048381',   
        'كفر الشيخ':        '01000048381',
        'دمياط':            '01000048381',
        'بورسعيد':          '01000048381',
        'الإسماعيلية':      '01000048381',
        'السويس':           '01000048381',
        'شمال سيناء':       '01000048381',
        'جنوب سيناء':       '01000048381',
        'البحر الأحمر':     '01000048381',
        'الفيوم':           '01000048381',
        'بني سويف':         '01000048381',
        'المنيا':           '01000048381',
        'أسيوط':            '01000048381',
        'سوهاج':            '01000048381',
        'قنا':              '01000048381',
        'الأقصر':           '01000048381',
        'أسوان':            '01000048381',
        'مطروح':            '01000048381',
        'الوادي الجديد':    '01000048381',
        'القليوبية':        '01000048381',
    };

    const defaultWhatsApp = '01000048381';


    governorateSelect.addEventListener('change', function () {
        const selectedGov = this.value;
        const phoneNumber = whatsappNumbers[selectedGov] || defaultWhatsApp;
        console.log(`تم اختيار: ${selectedGov} → رقم الواتساب: ${phoneNumber}`);
    });


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            governorate: governorateSelect.options[governorateSelect.selectedIndex].text,
            fullName:     document.getElementById('fullName').value.trim(),
            phone:        document.getElementById('phone').value.trim(),
            nationalId:   document.getElementById('nationalId').value.trim(),
            qualification: document.getElementById('qualification').options[document.getElementById('qualification').selectedIndex].text,
            committee:    document.getElementById('committee').options[document.getElementById('committee').selectedIndex].text,
            skills:       document.getElementById('skills').value.trim() || 'لا يوجد'
        };

        if (!data.fullName || !data.phone || !data.nationalId || !data.qualification || !data.committee) {
            showToast("يرجى ملء جميع الحقول الإجبارية", "error");
            return;
        }


        const phoneNumber = whatsappNumbers[data.governorate] || defaultWhatsApp;

        let message = `*طلب انضمام جديد - كيان إرادة شباب مصر*\n────────────────────\n`;
        message += `المحافظة: ${data.governorate}\n`;
        message += `الاسم الرباعي: ${data.fullName}\n`;
        message += `رقم الهاتف: ${data.phone}\n`;
        message += `الرقم القومي: ${data.nationalId}\n`;
        message += `المؤهل: ${data.qualification}\n`;
        message += `اللجنة المطلوبة: ${data.committee}\n`;

        if (data.skills) {
            message += `المهارات/الملاحظات: ${data.skills}\n`;
        }

        message += `\n────────────────────\n*تم الإرسال من الموقع الرسمي*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+2${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        showToast("تم تحويلك إلى واتساب المنسق بنجاح!", "success", 5000);

    });
});


function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} flex items-center justify-between`;
    toast.innerHTML = `
        <div class="flex-1">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    if (duration > 0) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }
}