
// Certificate Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    // Get all view certificate buttons
    const viewButtons = document.querySelectorAll('a[href="#"]');

    viewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.group');
            const img = card.querySelector('img');
            if (img) {
                modalImage.src = img.src.replace('h-56 w-full object-cover', 'w-full h-auto');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', function () {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });
});
