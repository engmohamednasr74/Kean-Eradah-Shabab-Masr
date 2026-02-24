document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("governorate-select");

  if (select) {
    select.addEventListener("change", function () {
      const slug = this.value;

      if (!slug) return; // لو مفيش اختيار، متعملش حاجة

      let targetUrl = "";

      if (slug === "main") {
        // الرجوع للصفحة الرئيسية (events.html في الـ root)
        targetUrl = "../Kean-Eradah-Shabab-Masr/events.html"; // ← أو "./events.html" حسب الموقع
      } else {
        // للمحافظات → مسار نسبي صحيح
        targetUrl = `../Kean-Eradah-Shabab-Masr/gov/${slug}/events.html`;
      }

      // التنقل
      window.location.href = targetUrl;
    });
  }
});
