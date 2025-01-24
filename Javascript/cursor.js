const cursor = document.querySelector(".cursor");
const lastImage = document.querySelector(".last-image");

// Array of project links
const projectLinks = ["TheModernMuseum.html", "EmergentX.html", "Regenerate.html"];

// Retrieve current project index from localStorage or default to 0
let currentProjectIndex = parseInt(localStorage.getItem("currentProjectIndex")) || 0;

if (!cursor || !lastImage) {
  console.error("Cursor or last image element not found!");
} else {
  let isPastLastImage = false;

  function handleScroll() {
    const lastImageRect = lastImage.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Update the state if the last image is scrolled past
    isPastLastImage = lastImageRect.bottom < windowHeight;

    cursor.classList.toggle("hover-next", isPastLastImage);
    cursor.textContent = isPastLastImage ? "Next" : "";
  }

  window.addEventListener("scroll", () => {
    requestAnimationFrame(handleScroll);
  });

  let rafId;
  window.addEventListener("mousemove", (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    });
  });

  window.addEventListener("click", () => {
    if (isPastLastImage) {
      const projectLink = projectLinks[currentProjectIndex];
      const currentPage = window.location.pathname.split("/").pop(); // Get the active page name

      console.log(`Current page: ${currentPage}`);
      console.log(`Target project link: ${projectLink}`);
      console.log(`Before update: currentProjectIndex = ${currentProjectIndex}`);

      // Navigate to the current project link
      if (projectLink !== currentPage) {
        console.log(`Navigating to ${projectLink}`);
        window.location.href = projectLink;
      }

      // Update the index to the next project
      currentProjectIndex = (currentProjectIndex + 1) % projectLinks.length;
      console.log(`After update: currentProjectIndex = ${currentProjectIndex}`);

      // Save the updated index to localStorage
      localStorage.setItem("currentProjectIndex", currentProjectIndex);
    } else {
      console.log("No navigation triggered.");
    }
  });

  cursor.style.opacity = 1;
}