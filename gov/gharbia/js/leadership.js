const path = "governorates/gharbia/leadership";

db.ref(path).on("value", (snapshot) => {
  const container = document.getElementById("leadership-container");
  container.innerHTML = "";
  const data = snapshot.val() || {};

  Object.entries(data).forEach(([id, item]) => {
    const card = document.createElement("div");
    card.className = "card-golden p-6 rounded-3xl text-center";
    card.innerHTML = `
                    <img src="${item.image || "https://via.placeholder.com/400x400?text=قيادة"}" 
                         class="w-32 h-32 mx-auto rounded-full object-cover border-4 border-golden mb-4">
                    <h3 class="text-xl font-bold text-accent">${item.name}</h3>
                    <p class="text-golden font-medium">${item.position}</p>
                    <p class="text-foreground/80 mt-3 text-sm">${item.desc || ""}</p>
                `;
    container.appendChild(card);
  });
});
