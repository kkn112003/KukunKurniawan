// --- Inisialisasi Typed.js & Footer Year (dari kode Anda sebelumnya) ---
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: ['Networking', 'Data Analyst', 'Gaming Lovers', 'Javaphile'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 500,
        smartBackspace: true,
        loop: true,
        cursorChar: '_',
    });
}
if (document.getElementById('year')) {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// ==========================================================
// === KODE BARU UNTUK NAVIGASI YANG LEBIH SMOOTH & KEREN ===
// ==========================================================
const navItems = document.querySelectorAll('.nav-item');
const navIndicator = document.querySelector('.nav-indicator');
const sections = document.querySelectorAll('.right-pane section[id]');

// Fungsi untuk memindahkan indikator
function moveIndicator(activeItem) {
    if (!activeItem || !navIndicator) return;
    const itemRect = activeItem.getBoundingClientRect();
    const navRect = activeItem.parentElement.getBoundingClientRect();

    navIndicator.style.width = `${itemRect.width}px`;
    navIndicator.style.left = `${itemRect.left - navRect.left}px`;
}

// Fungsi untuk menandai item navigasi sebagai aktif
function setActiveItem(item) {
    navItems.forEach(i => i.classList.remove('active'));
    if (item) {
        item.classList.add('active');
        moveIndicator(item);
    }
}

// Event listener untuk klik pada item navigasi
navItems.forEach(item => {
    item.addEventListener('click', function (e) {
        setActiveItem(this);
    });
});

// --- Fitur Keren: Scroll Spy (Navigasi aktif saat scroll) ---
const observerOptions = {
    root: document.querySelector('.right-pane'), // Tentukan kontainer scroll
    rootMargin: '0px',
    threshold: 0.4 // 40% dari section harus terlihat
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const correspondingNavItem = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
            setActiveItem(correspondingNavItem);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// --- Inisialisasi posisi awal saat halaman dimuat ---
const initiallyActiveItem = document.querySelector('.nav-item.active');
moveIndicator(initiallyActiveItem);

// --- Atur ulang posisi saat ukuran jendela berubah (Debounced) ---
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const activeItem = document.querySelector('.nav-item.active');
        moveIndicator(activeItem);
    }, 250); // Tunggu 250ms setelah resize selesai
});