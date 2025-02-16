// Play the selected video in the main player
function playVideo(videoSrc, title, description) {
    const mainVideo = document.getElementById("main-video");
    mainVideo.src = videoSrc;
    document.getElementById("video-title").innerText = title;
    document.getElementById("video-description").innerText = description;
  }
  
  // Add a new comment to the comments section
  function addComment() {
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value;
    // Do not post empty comments
    if (commentText.trim() === "") return;
    const commentList = document.getElementById("comments-list");
    const newComment = document.createElement("p");
    newComment.textContent = commentText;
    commentList.appendChild(newComment);
    // Clear the input field after posting
    commentInput.value = "";
  }
  
  // Initialize like and dislike counts
  let likeCount = 0,
      dislikeCount = 0;
  
  // Like button event listener
  document.getElementById("like-btn").addEventListener("click", function() {
    likeCount++;
    this.innerText = `👍 Like (${likeCount})`;
  });
  
  // Dislike button event listener
  document.getElementById("dislike-btn").addEventListener("click", function() {
    dislikeCount++;
    this.innerText = `👎 Dislike (${dislikeCount})`;
  });
  
  // Subscribe button event listener
  document.getElementById("subscribe-btn").addEventListener("click", function() {
    this.innerText = "✅ Subscribed";
    this.style.backgroundColor = "gray";
  });
  
  // Search functionality to find and highlight videos
  document.getElementById("search-btn").addEventListener("click", function() {
    const searchValue = document.getElementById("search-bar").value.trim().toLowerCase();
    const videoList = document.getElementById("video-list");
    const videos = videoList.querySelectorAll("li");
    let foundMatch = false;
    
    // Remove previous highlights
    videos.forEach(video => video.classList.remove("highlight"));
    // Clear any previous search message
    document.getElementById("search-message").innerText = "";
    
    // Loop through video list to find a match
    for (let i = 0; i < videos.length; i++) {
      let videoText = videos[i].innerText.toLowerCase();
      if (videoText.includes(searchValue) && searchValue !== "") {
        foundMatch = true;
        // Highlight the matched video and move it to the top
        videos[i].classList.add("highlight");
        videoList.insertBefore(videos[i], videoList.firstChild);
        break;
      }
    }
    // Display a message if no match is found
    if (!foundMatch && searchValue !== "") {
      document.getElementById("search-message").innerText = "No matching video found.";
    }
  });
  