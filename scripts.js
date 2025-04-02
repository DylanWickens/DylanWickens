document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.5 // Adjust visibility threshold
    });
  
    videos.forEach((video) => observer.observe(video));
  });