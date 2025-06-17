// Fungsi untuk menampilkan notifikasi
function showNotification(message, isSuccess = true) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');

    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.classList.remove('hidden');
        notification.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336';

        // Sembunyikan notifikasi setelah 5 detik
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 5000);
    }
}

// Fungsi untuk menangani pengiriman form
function handleFormSubmit(e) {
    e.preventDefault();
    
    const contactForm = e.target;
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;
    const consent = document.getElementById('consent')?.checked;
    const formMessage = document.getElementById('formMessage');
    
    // Validasi form
    if (!name || !email || !message || !consent) {
        if (formMessage) {
            formMessage.classList.remove('hidden');
            formMessage.innerHTML = 'Please fill in all required fields and give consent.';
        }
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i> Sending...';
    }

    // Kirim data form
    fetch(contactForm.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(contactForm)).toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        contactForm.reset();
        showNotification('Pesan berhasil dikirim!', true);
        if (formMessage) {
            formMessage.classList.add('hidden');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Gagal mengirim pesan. Silakan coba lagi nanti.', false);
    })
    .finally(() => {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });
}

// Inisialisasi form kontak saat dokumen siap
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});
