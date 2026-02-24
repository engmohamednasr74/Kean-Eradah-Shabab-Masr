const path = "governorates/gharbia/leadership";

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-content").classList.remove("hidden");
    loadLeadership();
  } else {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("admin-content").classList.add("hidden");
  }
});

function loadLeadership() {
  db.ref(path).on("value", (snapshot) => {
    const list = document.getElementById("leadership-list");
    list.innerHTML = "";
    const data = snapshot.val() || {};
    Object.entries(data).forEach(([id, item]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td class="p-2">${item.name || ""}</td>
                        <td class="p-2">${item.position || ""}</td>
                        <td class="p-2">${item.image ? '<img src="' + item.image + '" width="50">' : "لا صورة"}</td>
                        <td class="p-2">
                            <button onclick="editLeadership('${id}')" class="bg-yellow-600 text-white px-3 py-1 rounded text-sm">تعديل</button>
                            <button onclick="deleteLeadership('${id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm">حذف</button>
                        </td>
                    `;
      list.appendChild(row);
    });
  });
}

const form = document.getElementById("leadership-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById("leadership-name").value,
    position: document.getElementById("leadership-desc").value,
    image: document.getElementById("leadership-image").value,
  };
  const id = document.getElementById("leadership-id").value;
  if (id) {
    db.ref(`${path}/${id}`).update(data);
  } else {
    db.ref(path).push(data);
  }
  form.reset();
  document.getElementById("leadership-id").value = "";
  loadLeadership();
});

function editLeadership(id) {
  db.ref(`${path}/${id}`).once("value", (snap) => {
    const item = snap.val();
    document.getElementById("leadership-id").value = id;
    document.getElementById("leadership-name").value = item.name || "";
    document.getElementById("leadership-desc").value = item.position || "";
    document.getElementById("leadership-image").value = item.image || "";
  });
}

function deleteLeadership(id) {
  db.ref(`${path}/${id}`).remove();
}
