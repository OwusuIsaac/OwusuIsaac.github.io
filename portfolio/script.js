document.addEventListener('DOMContentLoaded', function() {
    // Sidebar elements
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const exploreBtn = document.getElementById('exploreBtn');
    const mobileMenuBtn = document.createElement('button');
    
    // Create mobile menu button for smaller screens
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.display = 'none';
    document.body.appendChild(mobileMenuBtn);
    
    // Toggle sidebar collapse/expand
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        updateToggleButton();
    }
    
    // Update toggle button position and icon
    function updateToggleButton() {
        if (sidebar.classList.contains('collapsed')) {
            toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        }
    }
    
    // Check screen width and adjust sidebar
    function checkScreenWidth() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('show');
            mobileMenuBtn.style.display = 'block';
            toggleBtn.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            toggleBtn.style.display = 'flex';
            sidebar.classList.remove('collapsed');
            updateToggleButton();
        }
    }
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });
    
    // Explore button animation
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            this.innerHTML = 'Opening Projects... <i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                document.querySelector('.sidebar-links li:nth-child(2) a').click();
                this.innerHTML = 'Explore My Work <i class="fas fa-arrow-right"></i>';
            }, 1500);
        });
    }
    
    // Add animation to sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Animate content change
            const overlayText = document.querySelector('.overlay-text');
            if (overlayText) {
                overlayText.style.animation = 'fadeOut 0.3s forwards';
                
                setTimeout(() => {
                    // Change content based on clicked link
                    const linkText = this.textContent.trim();
                    const overlay = document.querySelector('.overlay-text');
                    
                    if (linkText.includes('Home')) {
                        overlay.innerHTML = `
                            <h2>Welcome to My Digital Canvas</h2>
                            <p>This space is a curated collection of my creative journey through Communications Lab. Each project represents a different facet of digital storytelling - from film to interactive experiences.</p>
                            <p>As a designer and storyteller, I believe in the power of visual communication. This portfolio showcases my exploration of different media formats and my evolving technical skills.</p>
                            <button class="explore-btn" id="exploreBtn">Explore My Work</button>
                        `;
                        // Reattach event listener to new explore button
                        document.getElementById('exploreBtn').addEventListener('click', function() {
                            this.innerHTML = 'Opening Projects... <i class="fas fa-spinner fa-spin"></i>';
                            setTimeout(() => {
                                document.querySelector('.sidebar-links li:nth-child(2) a').click();
                                this.innerHTML = 'Explore My Work <i class="fas fa-arrow-right"></i>';
                            }, 1500);
                        });
                    } else if (linkText.includes('30MFF')) {
                        overlay.innerHTML = `
                            <h2>30MFF: "Forgiveness" Film</h2>
                            <p>An interactive website for a film festival featuring "Forgiveness" - a short film about two childhood friends reconciling after a long-standing feud.</p>
                            <p>The site features a responsive video player, dynamic like/dislike counters, comment section, and search functionality. The clean red, white, and black design evokes a film festival aesthetic while emphasizing themes of reconciliation.</p>
                            <p><strong>Technical Highlights:</strong> Flexbox layout, dynamic content updating, interactive elements with JavaScript, and responsive design.</p>
                            <a href="https://owusuisaac.github.io/30MFF_Website/index.html" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>
                        `;
                    } else if (linkText.includes('Sound')) {
                        overlay.innerHTML = `
                            <h2>Game Time: Basketball Sound Experience</h2>
                            <p>An immersive web-based sound piece that transports listeners courtside for a full basketball experience, from warm-up to final buzzer.</p>
                            <p>The interactive court-themed page lets users click different areas to trigger basketball animations while listening to layered audio of gameplay, crowd reactions, and coach advice. The minimal interface focuses attention on the spatialized audio experience.</p>
                            <p><strong>Technical Highlights:</strong> Original audio recording and mixing, interactive basketball animations, responsive design with HTML/CSS/JavaScript.</p>
                            <a href="https://owusuisaac.github.io/Sound_project/index.html" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>
                        `;
                    } else if (linkText.includes('Video')) {
                        overlay.innerHTML = `
                            <h2>Exam Day: Interactive Video Project</h2>
                            <p>An interactive video following a student's exam day with branching narratives based on viewer choices about academic integrity.</p>
                            <p>The school-themed website features a classroom aesthetic with intuitive navigation. Viewers make decisions that affect the story outcome, exploring themes of academic pressure and consequences.</p>
                            <p><strong>Technical Highlights:</strong> Branching video narrative, school-themed UI design, behind-the-scenes content, responsive layout.</p>
                            <a href="https://owusuisaac.github.io/Video_Project/" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>
                        `;
                    } else if (linkText.includes('Comic')) {
                        overlay.innerHTML = `
                            <h2>The Great Big Nature Adventure</h2>
                            <p>An interactive choose-your-own-adventure comic following a traveler who discovers magical books transporting her to different worlds.</p>
                            <p>The comic features consistent character design across diverse environments with three possible story paths. Interactive elements allow readers to influence the narrative progression while maintaining a cohesive visual style.</p>
                            <p><strong>Technical Highlights:</strong> Interactive comic navigation, consistent character design across environments, responsive layout, and intuitive user controls.</p>
                            <a href="https://janiajones.github.io/Comic/" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>
                        `;
                    }
                    
                    overlayText.style.animation = 'fadeIn 0.5s forwards';
                }, 300);
            }
        });
    });
    
    // Initial setup
    toggleBtn.addEventListener('click', toggleSidebar);
    window.addEventListener('resize', checkScreenWidth);
    checkScreenWidth();
    updateToggleButton();
});