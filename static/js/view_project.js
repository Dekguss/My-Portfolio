document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('#projects .grid');
    const projectItems = document.querySelectorAll('#projects .project-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let showingAllProjects = false;
    const itemsPerLoad = 6; // Number of items to show initially

    // Function to toggle projects visibility
    function toggleProjects() {
        showingAllProjects = !showingAllProjects;
        
        if (showingAllProjects) {
            // Show all projects
            projectItems.forEach(project => project.classList.remove('hidden'));
            loadMoreBtn.innerHTML = `
                Show Less
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                </svg>
            `;
        } else {
            // Show only first 6 projects
            projectItems.forEach((project, index) => {
                if (index >= itemsPerLoad) {
                    project.classList.add('hidden');
                }
            });
            loadMoreBtn.innerHTML = `
                View All Projects
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            `;
            
            // Scroll to projects section when hiding
            setTimeout(() => {
                projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Only proceed if there are more projects than itemsPerLoad
    if (projectItems.length > itemsPerLoad) {
        // Initially hide projects beyond the first itemsPerLoad
        projectItems.forEach((project, index) => {
            if (index >= itemsPerLoad) {
                project.classList.add('hidden');
            }
        });

        // Add click event to the button
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleProjects();
            
            // Smooth scroll to the section when showing all
            if (showingAllProjects) {
                setTimeout(() => {
                    projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    } else {
        // If itemsPerLoad or fewer projects, hide the button
        loadMoreBtn.style.display = 'none';
    }
});