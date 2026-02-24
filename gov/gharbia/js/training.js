const path = "governorates/gharbia/training";

db.ref(path).on("value", (snapshot) => {
  const container = document.getElementById("training-container");
  container.innerHTML = "";
  const data = snapshot.val() || {};

  Object.entries(data).forEach(([id, item]) => {
    const card = document.createElement("div");
    card.className = "card-golden p-6 rounded-3xl";
    card.innerHTML = `
                    <img src="${item.image || "https://via.placeholder.com/600x400?text=تدريب"}" class="w-full h-48 object-cover rounded-2xl mb-4">
                    <h3 class="text-xl font-bold text-accent mb-2">${item.title}</h3>
                    <p class="text-sm text-golden mb-2">${item.status || ""}</p>
                    <p class="text-foreground/80 line-clamp-3">${item.desc}</p>
                `;
    container.appendChild(card);
  });
});
