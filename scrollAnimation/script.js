document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section'); // Get all sections
    const navLinks = document.querySelectorAll('#navbar ul li a'); // Get all navigation links

    // Intersection Observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add class when section is in view
            } else {
                entry.target.classList.remove('active'); // Remove class when section is out of view
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = link.getAttribute('href').substring(1); // Get target section ID
            const targetSection = document.getElementById(targetId); // Find target section
            targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
        });
    });
});