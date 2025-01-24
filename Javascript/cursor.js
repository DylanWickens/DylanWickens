// Select the single cursor element
const cursor = document.querySelector(".cursor");

// Select the last image container
const lastImage = document.querySelector(".last-image");

// Select the hidden <a> tag
const hiddenLink = document.getElementById("hiddenLink");

// Track mouse movement to update cursor position
window.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;

  // Update the position of the single cursor
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});

// Handle the scroll event to check the position of the last image
function handleScroll() {
  const lastImageRect = lastImage.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if the last image is above the viewport
  if (lastImageRect.bottom < windowHeight) {
    cursor.classList.add("hover-next"); // Add hover-next class
    cursor.textContent = "Next"; // Add "Next" text
  } else {
    cursor.classList.remove("hover-next"); // Remove hover-next class
    cursor.textContent = ""; // Ensure text is cleared when above last image
  }
}

// Attach the scroll event listener
window.addEventListener("scroll", handleScroll);

// Trigger the hidden <a> tag when the cursor is clicked in hover-next state
cursor.addEventListener("click", () => {
  if (cursor.classList.contains("hover-next")) {
    console.log("Navigating to emergentx.html via hidden <a> tag");
    hiddenLink.click(); // Simulate a click on the hidden <a> tag
  }
});

// Ensure the cursor is visible on page load
cursor.style.opacity = 1; // Ensure cursor is visible by default