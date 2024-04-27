let lastScrollTop = 0; // Keep track of the last scroll position
const header = document.getElementById("header"); // Get the header element

window.addEventListener(
  "scroll",
  function () {
    let currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scroll down
      header.style.top = "-94px"; // Adjust this value based on your header's height
    } else {
      // Scroll up
      header.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  },
  false
);

document.addEventListener("DOMContentLoaded", (event) => {
  const dynamicText = document.getElementById("dynamic-text");
  const phrases = ["Software.", "Apps.", "Stuff."];
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = "";
  let isDeleting = false;
  let isCompleted = false; // Flag to indicate the end of the animation

  function type() {
    // Check if we've completed the typing cycle
    if (isCompleted) {
      return; // Stop any further typing if the flag is set
    }

    if (
      phraseIndex === phrases.length - 1 &&
      !isDeleting &&
      currentPhrase === phrases[phraseIndex]
    ) {
      dynamicText.classList.remove("cursor"); // Remove the cursor at the end
      isCompleted = true; // Set the flag to true
      return; // Stop the typing animation
    }

    if (isDeleting) {
      currentPhrase = phrases[phraseIndex].substring(
        0,
        currentPhrase.length - 1
      );
    } else {
      currentPhrase = phrases[phraseIndex].substring(0, letterIndex + 1);
    }

    dynamicText.textContent = currentPhrase;
    letterIndex += isDeleting ? -1 : 1;

    if (!isDeleting && currentPhrase === phrases[phraseIndex]) {
      if (phraseIndex === phrases.length - 1) {
        setTimeout(() => {
          dynamicText.classList.remove("cursor"); // Ensure the cursor is removed right after the last word is typed
          isCompleted = true; // Update the completion flag
        }, 1000); // Wait a bit before removing the cursor to allow for any final cursor blinks
        return;
      }
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && currentPhrase === "") {
      isDeleting = false;
      letterIndex = 0;
      phraseIndex++;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 120);
    }
  }

  setTimeout(type, 1000);
});

const intercept = document.createElement("div");

intercept.setAttribute("data-observer-intercept", "");
header.before(intercept);

const observer = new IntersectionObserver(([entry]) => {
  header.classList.toggle("active", !entry.isIntersecting);
});

observer.observe(intercept);