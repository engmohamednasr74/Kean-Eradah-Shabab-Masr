document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("governorate-select");

  if (select) {
    select.addEventListener("change", function () {
      const slug = this.value;

      if (!slug) return; // لو مفيش اختيار، متعملش حاجة

      let targetUrl = "";

      if (slug === "main") {
        // للصفحة الرئيسية → مسار مطلق من الـ root
        targetUrl = "/events.html"; // ← غيّرها لـ /index.html لو دي الصفحة الرئيسية
        // أو لو الصفحة الرئيسية هي index.html في الـ root:
        // targetUrl = '/index.html';
      } else {
        // للمحافظات → مسار مطلق من الـ root
        targetUrl = `/gov/${slug}/events.html`; // نفس الصفحة الحالية في المحافظة الجديدة
        // لو عايز دايمًا يروح لصفحة معينة (مثل events):
        // targetUrl = `/gov/${slug}/events.html`;
      }

      window.location.href = targetUrl;
    });
  }
});
