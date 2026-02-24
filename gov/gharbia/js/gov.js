document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("governorate-select");

  if (select) {
    select.addEventListener("change", function () {
      const slug = this.value;

      if (!slug) return; // لو مفيش اختيار، متعملش حاجة

      let targetUrl = "";

      if (slug === "main") {
        // الرجوع للصفحة الرئيسية (events.html في الـ root)
        targetUrl = "../../../index.html"; // ← أو "./events.html" حسب الموقع
      } else {
        // للمحافظات → مسار نسبي صحيح
        targetUrl = `Kean-Eradah-Shabab-Masr/gov/${slug}/events.html`;
        // اضف اسم كيان قبل رفع الموقع
        // Kean-Eradah-Shabab-Masr
      }

      // التنقل
      window.location.href = targetUrl;
    });
  }
});
