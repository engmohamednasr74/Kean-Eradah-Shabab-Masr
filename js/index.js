var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 2, spaceBetween: 20 }
    }
});
db.ref('projects').on('value', (snapshot) => {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    const data = snapshot.val() || {};
    Object.entries(data).forEach(([id, project]) => {
        const card = document.createElement('div');
        card.className = 'card-golden p-6 rounded-lg shadow-md';
        card.innerHTML = `
                <img src="${project.image || 'img/default-project.jpg'}" alt="${project.title}" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
            `;
        container.appendChild(card);
    });
    if (Object.keys(data).length === 0) {
        container.innerHTML = '<p class="text-center text-muted-foreground">لا توجد مشاريع حاليًا.</p>';
    }
});

db.ref('gallery').on('value', (snapshot) => {
    const container = document.getElementById('gallery-container');
    container.innerHTML = '';
    const data = snapshot.val() || {};

    Object.entries(data).forEach(([id, item]) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <a href="${item.image}" data-fslightbox="gallery">
                <img src="${item.image}" alt="${item.title || 'صورة جماعية'}" class="w-full h-[400px] object-cover rounded">
                ${item.title ? '<p class="text-center mt-2 text-sm text-white bg-black/50 py-1">' + item.title + '</p>' : ''}
            </a>
        `;
        container.appendChild(slide);
    });

    if (Object.keys(data).length === 0) {
        container.innerHTML = '<p class="text-center text-muted-foreground py-10">لا توجد صور حاليًا.</p>';
        return;
    }

    if (typeof swiper !== 'undefined') {
        swiper.destroy(true, true);
    }

    swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 }
        }
    });

    refreshFsLightbox();
});