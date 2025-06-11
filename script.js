document.addEventListener('DOMContentLoaded', () => {
    const mainNavLinks = document.querySelectorAll('nav ul li a');
    const chapterLinks = document.querySelectorAll('.topic-list .chapter-link'); // Links within the #topics section
    const contentSections = document.querySelectorAll('.content-section');
    let defaultSectionId = 'welcome';

    function updateMainNavActiveState(currentSectionId) {
        mainNavLinks.forEach(navLink => {
            // Determine if this navLink (or its target) is an ancestor or direct match for currentSectionId
            // For simplicity now, if currentSectionId is 'basic-greetings' or 'basic-introductions',
            // we know 'topics' is the active main tab.
            let mainNavLinkTarget = navLink.getAttribute('href').substring(1);
            if (mainNavLinkTarget === currentSectionId) {
                navLink.classList.add('active-tab');
            } else if (mainNavLinkTarget === 'topics' && (currentSectionId === 'basic-greetings' || currentSectionId === 'basic-introductions')) {
                navLink.classList.add('active-tab');
            }
            else {
                navLink.classList.remove('active-tab');
            }
        });
    }

    function showSection(targetId) {
        const sectionId = targetId.startsWith('#') ? targetId.substring(1) : targetId;

        contentSections.forEach(section => {
            section.style.display = (section.id === sectionId) ? 'block' : 'none';
        });
        updateMainNavActiveState(sectionId);
    }

    // Event listeners for main navigation links
    mainNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            showSection(targetId);
            // history.pushState(null, null, targetId); // Optional
        });
    });

    // Event listeners for chapter links within the #topics section
    chapterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href'); // e.g., "#basic-introductions"
            showSection(targetId);
            // history.pushState(null, null, targetId); // Optional
        });
    });

    // Initial load
    let initialSectionIdToShow = defaultSectionId;
    if (window.location.hash) {
        const hashId = window.location.hash;
        let validHash = false;
        contentSections.forEach(section => {
            if ('#' + section.id === hashId) {
                validHash = true;
            }
        });
        if (validHash) {
            initialSectionIdToShow = hashId.substring(1);
        }
    }
    showSection(initialSectionIdToShow);
});
