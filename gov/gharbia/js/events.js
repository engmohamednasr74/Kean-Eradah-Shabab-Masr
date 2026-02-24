const path = "governorates/gharbia/events";

db.ref(path).on("value", (snapshot) => {
  const container = document.getElementById("events-container");
  container.innerHTML = "";

  const data = snapshot.val() || {};
  Object.entries(data).forEach(([id, event]) => {
    const card = document.createElement("div");
    card.className = "card-golden p-6 rounded-3xl overflow-hidden";
    card.innerHTML = `
                    <img src="${event.image || "https://via.placeholder.com/600x400?text=الغربية"}" 
                         class="w-full h-48 object-cover rounded-2xl mb-4">
                    <h3 class="text-xl font-bold text-accent mb-2">${event.title}</h3>
                    <p class="text-sm text-muted-foreground mb-3">${event.date || ""}</p>
                    <p class="text-foreground/80 line-clamp-3">${event.desc}</p>
                `;
    container.appendChild(card);
  });
});
