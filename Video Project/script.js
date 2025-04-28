
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('movieVideo');
    const questionContainer = document.getElementById('questionContainer');
    const messageText = document.getElementById('messageText');
    const navLinks = document.querySelectorAll('.nav-link');

    // Flags to track the state of the question and user response
    let questionAsked = false;
    let userAnswered = false;

    // Handle video events if the video element exists
    if (video) {
        // Monitor the current time of the video
        video.addEventListener('timeupdate', function() {
            // After 3 minutes (180 seconds), pause the video and show the question
            if (video.currentTime >= 180 && !questionAsked) { 
                video.pause();
                if (questionContainer) {
                    questionContainer.style.display = 'flex';
                }
                questionAsked = true;
            }
        });

        // When the video ends, reset the question and user state
        video.addEventListener('ended', function() {
            questionAsked = false;
            userAnswered = false;
            if (questionContainer) {
                questionContainer.style.display = 'none';
            }
            if (messageText) {
                messageText.innerText = '';
                messageText.style.display = 'none';
            }
        });

        // When the video starts playing from the beginning, reset everything
        video.addEventListener('play', function() {
            if (video.currentTime === 0) {
                questionAsked = false;
                userAnswered = false;
                if (questionContainer) {
                    questionContainer.style.display = 'none';
                }
                if (messageText) {
                    messageText.innerText = '';
                    messageText.style.display = 'none';
                }
            }
        });
    }

    // Function to handle the user's answer selection
    window.selectAnswer = function(answer) {
        if (!userAnswered) {
            userAnswered = true;

            // Hide the question container after answering
            if (questionContainer) {
                questionContainer.style.display = 'none';
            }
            // Resume playing the video
            video.play();

            // After 21 seconds of resuming, show the result message
            setTimeout(() => {
                if (!video.paused) {
                    if (messageText) {
                        messageText.innerText = (answer === 'pass') 
                            ? "Oops, you were too delusional" 
                            : "Yes you were right!";
                        messageText.style.display = 'block';

                        // Hide the message after 2 seconds
                        setTimeout(() => {
                            messageText.style.display = 'none';
                        }, 2000);
                    }
                }
            }, 21000); // 21 seconds = 21000 milliseconds
        }
    }

    // Restore the selected navigation link from local storage
    const selectedHref = localStorage.getItem('selectedNav');
    if (selectedHref) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === selectedHref) {
                link.classList.add('selected');
            }
        });
    }

    // Add click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            navLinks.forEach(l => l.classList.remove('selected'));
           
            this.classList.add('selected');
       
            localStorage.setItem('selectedNav', this.getAttribute('href'));

    
            const href = this.getAttribute('href');
            setTimeout(() => {
                window.location.href = href;
            }, 300); // 300ms delay
        });
    });
});
