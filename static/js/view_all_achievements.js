document.addEventListener('DOMContentLoaded', function() {
    const achievementsGrid = document.querySelector('#achievements .grid');
    const certificates = document.querySelectorAll('#achievements .grid > div');
    const viewAllBtn = document.getElementById('viewAllAchievementsBtn');
    let showingAll = false;
    
    // Function to toggle certificates visibility
    function toggleCertificates() {
        showingAll = !showingAll;
        
        if (showingAll) {
            // Show all certificates
            certificates.forEach(cert => cert.classList.remove('hidden'));
            viewAllBtn.innerHTML = `
                Show Less
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                </svg>
            `;
        } else {
            // Show only first 6 certificates
            certificates.forEach((cert, index) => {
                if (index >= 6) {
                    cert.classList.add('hidden');
                }
            });
            viewAllBtn.innerHTML = `
                View All Achievements
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            `;
        }
    }
    
    // Only proceed if there are more than 6 certificates
    if (certificates.length > 6) {
        // Initially hide certificates beyond the first 6
        certificates.forEach((cert, index) => {
            if (index >= 6) {
                cert.classList.add('hidden');
            }
        });
        
        // Add click event to the button
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCertificates();
            
            // Smooth scroll to the section when showing all
            if (showingAll) {
                setTimeout(() => {
                    achievementsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    } else {
        // If 6 or fewer certificates, hide the button
        viewAllBtn.style.display = 'none';
    }
});