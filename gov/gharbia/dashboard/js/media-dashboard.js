const path = "governorates/gharbia/media";

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-content").classList.remove("hidden");
    loadMedia();
  } else {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("admin-content").classList.add("hidden");
  }
});

function loadMedia() {
  db.ref(path).on("value", (snapshot) => {
    const list = document.getElementById("media-list");
    list.innerHTML = "";
    const data = snapshot.val() || {};

    Object.entries(data).forEach(([id, item]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td class="p-3 font-medium">${item.title || ""}</td>
                        <td class="p-3">
                            ${item.image ? `<img src="${item.image}" width="60" class="rounded">` : "لا صورة"}
                        </td>
                        <td class="p-3">
                            ${item.video ? `<a href="${item.video}" target="_blank" class="text-blue-600 hover:underline">شاهد الفيديو</a>` : "لا رابط"}
                        </td>
                        <td class="p-3">
                            <button onclick="editMedia('${id}')" class="bg-yellow-600 text-white px-3 py-1 rounded text-sm">تعديل</button>
                            <button onclick="deleteMedia('${id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm">حذف</button>
                        </td>
                    `;
      list.appendChild(row);
    });
  });
}

const form = document.getElementById("media-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById("media-title").value,
    desc: document.getElementById("media-desc").value,
    image: document.getElementById("media-image").value,
    video: document.getElementById("media-video").value,
  };

  const id = document.getElementById("media-id").value;
  if (id) {
    db.ref(`${path}/${id}`).update(data);
  } else {
    db.ref(path).push(data);
  }

  form.reset();
  document.getElementById("media-id").value = "";
  loadMedia();
});

function editMedia(id) {
  db.ref(`${path}/${id}`).once("value", (snap) => {
    const item = snap.val();
    document.getElementById("media-id").value = id;
    document.getElementById("media-title").value = item.title || "";
    document.getElementById("media-desc").value = item.desc || "";
    document.getElementById("media-image").value = item.image || "";
    document.getElementById("media-video").value = item.video || "";
  });
}

function deleteMedia(id) {
  db.ref(`${path}/${id}`).remove();
}
