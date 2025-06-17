// Fungsi untuk menangani navigasi
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle sidebar di perangkat mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    // Menutup sidebar saat memilih link di perangkat mobile
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('open');
            }
            // Highlight link aktif
            navLinks.forEach(navLink => {
                navLink.classList.remove('bg-primary', 'text-white');
            });
            link.classList.add('bg-primary', 'text-white');
        });
    });

    // Menutup sidebar saat klik di luar area sidebar
    document.addEventListener('click', function (event) {
        if (window.innerWidth < 768 &&
            !sidebar.contains(event.target) &&
            !menuToggle.contains(event.target) &&
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // Fungsi untuk menyorot link navigasi yang aktif berdasarkan scroll
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('bg-primary', 'text-white');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('bg-primary', 'text-white');
                    }
                });
            }
        });
    }

    // Menambahkan event listener untuk scroll dan memanggil fungsi setActiveLink
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Panggil sekali saat halaman dimuat
});
