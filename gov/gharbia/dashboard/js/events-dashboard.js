const path = "governorates/gharbia/events";

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-content").classList.remove("hidden");
    loadEvents();
  } else {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("admin-content").classList.add("hidden");
  }
});

function loadEvents() {
  db.ref(path).on("value", (snapshot) => {
    const list = document.getElementById("events-list");
    list.innerHTML = "";
    const data = snapshot.val() || {};
    Object.entries(data).forEach(([id, item]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td class="p-2">${item.title || ""}</td>
                        <td class="p-2">${item.date || ""}</td>
                        <td class="p-2">${item.image ? '<img src="' + item.image + '" width="50">' : "لا صورة"}</td>
                        <td class="p-2">
                            <button onclick="editEvent('${id}')" class="bg-yellow-600 text-white px-3 py-1 rounded text-sm">تعديل</button>
                            <button onclick="deleteEvent('${id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm">حذف</button>
                        </td>
                    `;
      list.appendChild(row);
    });
  });
}

const form = document.getElementById("event-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById("event-title").value,
    desc: document.getElementById("event-desc").value,
    date: document.getElementById("event-date").value,
    image: document.getElementById("event-image").value,
  };
  const id = document.getElementById("event-id").value;
  if (id) {
    db.ref(`${path}/${id}`).update(data);
  } else {
    db.ref(path).push(data);
  }
  form.reset();
  document.getElementById("event-id").value = "";
  loadEvents();
});

function editEvent(id) {
  db.ref(`${path}/${id}`).once("value", (snap) => {
    const item = snap.val();
    document.getElementById("event-id").value = id;
    document.getElementById("event-title").value = item.title || "";
    document.getElementById("event-desc").value = item.desc || "";
    document.getElementById("event-date").value = item.date || "";
    document.getElementById("event-image").value = item.image || "";
  });
}

function deleteEvent(id) {
  db.ref(`${path}/${id}`).remove();
  // if (confirm('هل تريد حذف هذه الفعالية؟')) {
  // }
}
