document.addEventListener('DOMContentLoaded', function() {
    const questionContainer = document.getElementById('questionContainer');
    const messageText = document.getElementById('messageText');
    const navLinks = document.querySelectorAll('.nav-link');

    let player;
    let questionAsked = false;
    let userAnswered = false;

    // Load YouTube IFrame API dynamically
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('movieVideo', {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // Monitor changes in video player state
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            // Start checking video time
            checkVideoTime();
        } else if (event.data == YT.PlayerState.ENDED) {
            // Reset states when video ends
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
    }

    // Function to repeatedly check the current time of the video
    function checkVideoTime() {
        if (player && player.getCurrentTime) {
            const currentTime = player.getCurrentTime();

            if (currentTime >= 180 && !questionAsked) { // 3 minutes
                player.pauseVideo();
                if (questionContainer) {
                    questionContainer.style.display = 'flex';
                }
                questionAsked = true;
            } else if (!questionAsked) {
                // Keep checking until question time is reached
                setTimeout(checkVideoTime, 1000);
            }
        }
    }

    // Function to handle user selecting an answer
    window.selectAnswer = function(answer) {
        if (!userAnswered) {
            userAnswered = true;

            if (questionContainer) {
                questionContainer.style.display = 'none';
            }

            player.playVideo();

            // After 21 seconds, show the result message
            setTimeout(() => {
                if (player.getPlayerState() === YT.PlayerState.PLAYING) {
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
            }, 21000); // 21 seconds
        }
    }

    // Restore the selected nav link from localStorage
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
