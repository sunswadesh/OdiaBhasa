document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('nav ul li a');
    const contentSections = document.querySelectorAll('.content-section');
    let defaultSectionId = 'welcome'; // Show 'welcome' section by default

    // Function to show a specific section and update active tab
    function showSection(targetId) {
        // Remove '#' from targetId if it exists (it will from href)
        const sectionId = targetId.startsWith('#') ? targetId.substring(1) : targetId;

        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        tabLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active-tab');
            } else {
                link.classList.remove('active-tab');
            }
        });
    }

    // Add click event listeners to tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor jump
            const targetId = link.getAttribute('href');
            showSection(targetId);
            // Optionally, update URL hash without jumping:
            // history.pushState(null, null, targetId);
        });
    });

    // Show the default section on initial page load
    // Check if URL hash exists and try to show that section, otherwise show default
    if (window.location.hash) {
        const hashId = window.location.hash;
        // Validate if the hash corresponds to a known section to prevent errors
        let validHash = false;
        contentSections.forEach(section => {
            if ('#' + section.id === hashId) {
                validHash = true;
            }
        });
        if (validHash) {
            defaultSectionId = hashId.substring(1); // Use ID from hash
        }
    }
    showSection(defaultSectionId); // Show default or hash-specified section
});
