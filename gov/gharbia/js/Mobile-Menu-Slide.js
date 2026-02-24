const menuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('mobile-sidebar');
const closeBtn = document.getElementById('close-mobile-menu');
const overlay = document.getElementById('mobile-overlay');

menuBtn.addEventListener('click', function () {
    sidebar.style.right = '0';
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

function closeMenu() {
    sidebar.style.right = '-100%';
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});