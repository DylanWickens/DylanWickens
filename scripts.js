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
      threshold: 0.5 
    });
  
    videos.forEach((video) => observer.observe(video));

    const video = document.querySelector('.autoplay-video');
    const overlay = document.querySelector('.tap-for-audio');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (video && overlay) {
      if (isMobile) {
        video.muted = true;
      }

      function enableAudio() {
        if (video.muted) {
          video.muted = false;
          video.play();
        }
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
      }

      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
      }, 1250);

      video.addEventListener('click', enableAudio);
    }
  });