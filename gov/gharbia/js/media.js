const path = "governorates/gharbia/media";

db.ref(path).on("value", (snapshot) => {
  const container = document.getElementById("media-container");
  container.innerHTML = "";
  const data = snapshot.val() || {};

  Object.entries(data).forEach(([id, item]) => {
    const card = document.createElement("div");
    card.className = "card-golden p-6 rounded-3xl";
    card.innerHTML = `
                    <img src="${item.image || "https://via.placeholder.com/600x400?text=إعلام"}" class="w-full h-48 object-cover rounded-2xl mb-4">
                    <h3 class="text-xl font-bold text-accent mb-2">${item.title}</h3>
                    <p class="text-foreground/80 line-clamp-3">${item.desc}</p>
                    ${item.video ? `<a href="${item.video}" target="_blank" class="text-golden hover:underline block mt-4">شاهد الآن →</a>` : ""}
                `;
    container.appendChild(card);
  });
});
