document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("governorate-select");

  if (!select) {
    console.warn("لم يتم العثور على عنصر select بـ id = governorate-select");
    return;
  }

  select.addEventListener("change", function () {
    const slug = this.value.trim();

    if (!slug) return; // لو مفيش اختيار، متعملش حاجة

    let targetPath = "";

    if (slug === "main" || slug === "") {
      // الرجوع للصفحة الرئيسية (index.html في الـ root)
      targetPath = "../../index.html";
    } else {
      // الانتقال لمجلد المحافظة
      targetPath = `../gov/${slug}/events.html`; // ← غيّر events.html لأي صفحة تانية لو عايز
    }

    // التنقل
    window.location.href = targetPath;
  });

  // اختياري: تحديد القيمة الحالية في الـ select بناءً على المسار
  const currentPath = window.location.pathname;
  if (currentPath.includes("/gov/")) {
    const parts = currentPath.split("/");
    const currentGov = parts[parts.indexOf("gov") + 1];
    if (currentGov) select.value = currentGov;
  } else {
    select.value = "main";
  }
});
