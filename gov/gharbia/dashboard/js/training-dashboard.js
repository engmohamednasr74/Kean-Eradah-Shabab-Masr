const path = "governorates/gharbia/training";

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-content").classList.remove("hidden");
    loadTrainings();
  } else {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("admin-content").classList.add("hidden");
  }
});

function loadTrainings() {
  db.ref(path).on("value", (snapshot) => {
    const list = document.getElementById("training-list");
    list.innerHTML = "";
    const data = snapshot.val() || {};
    Object.entries(data).forEach(([id, item]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td class="p-2">${item.title || ""}</td>
                        <td class="p-2">${item.desc || ""}</td>
                        <td class="p-2">${item.image ? '<img src="' + item.image + '" width="50">' : "لا صورة"}</td>
                        <td class="p-2">${item.status || ""}</td>
                        <td class="p-2">
                            <button onclick="editTraining('${id}')" class="bg-yellow-600 text-white px-3 py-1 rounded text-sm">تعديل</button>
                            <button onclick="deleteTraining('${id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm">حذف</button>
                        </td>
                    `;
      list.appendChild(row);
    });
  });
}

const form = document.getElementById("training-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById("training-title").value,
    desc: document.getElementById("training-desc").value,
    image: document.getElementById("training-image").value,
    status: document.getElementById("training-status").value,
  };
  const id = document.getElementById("training-id").value;
  if (id) {
    db.ref(`${path}/${id}`).update(data);
  } else {
    db.ref(path).push(data);
  }
  form.reset();
  document.getElementById("training-id").value = "";
  loadTrainings();
});

function editTraining(id) {
  db.ref(`${path}/${id}`).once("value", (snap) => {
    const item = snap.val();
    document.getElementById("training-id").value = id;
    document.getElementById("training-title").value = item.title || "";
    document.getElementById("training-desc").value = item.desc || "";
    document.getElementById("training-image").value = item.image || "";
    document.getElementById("training-status").value = item.status || "";
  });
}

function deleteTraining(id) {
  db.ref(`${path}/${id}`).remove();
}
