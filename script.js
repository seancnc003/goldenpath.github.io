// Scroll to petition section
function scrollToPetition() {
    const petitionSection = document.getElementById("petition-section");
    petitionSection.scrollIntoView({ behavior: "smooth" });
}

// Validate signature and add to list
function validateSignature(event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const cityInput = document.getElementById("city");
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("error-message");

    // Validate inputs
    let isValid = true;
    errorMessage.textContent = "";

    if (nameInput.value.trim().length < 3) {
        isValid = false;
        nameInput.classList.add("invalid");
        errorMessage.textContent += "Please enter a valid full name (at least 3 characters). ";
    } else {
        nameInput.classList.remove("invalid");
    }

    if (cityInput.value.trim().length < 2) {
        isValid = false;
        cityInput.classList.add("invalid");
        errorMessage.textContent += "Please enter a valid city name. ";
    } else {
        cityInput.classList.remove("invalid");
    }

    if (!emailInput.value.includes("@")) {
        isValid = false;
        emailInput.classList.add("invalid");
        errorMessage.textContent += "Please enter a valid email address.";
    } else {
        emailInput.classList.remove("invalid");
    }

    if (isValid) {
        addSignature(nameInput.value.trim(), cityInput.value.trim(), emailInput.value.trim());

        // Show the modal with the user's name
        showModal(nameInput.value.trim());

        // Clear input fields
        nameInput.value = "";
        cityInput.value = "";
        emailInput.value = "";
    }
}

// Add signature to the signature list
function addSignature(name, city, email) {
    const signatureList = document.getElementById("signature-list");
    const signature = document.createElement("p");
    signature.textContent = `${name} from ${city} (${email})`;
    signatureList.appendChild(signature);
}

// potential error

// Toggle light and dark mode
// Toggle light and dark mode
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");

    // Toggle dark mode class on body
    body.classList.toggle("dark-mode");

    // Toggle dark mode class on specific elements, including the modal
    document.querySelectorAll(".navbar, .career-card, .about, .footer, .petition-container, .nav-link, button, input, textarea, .modal, .modal-message")
        .forEach(el => el.classList.toggle("dark-mode"));

    // Update emoji based on theme
    if (body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = "&#x1F319;"; // Moon emoji for dark mode
    } else {
        themeToggle.innerHTML = "&#x1F31E;"; // Sun emoji for light mode
    }
}


// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight && rect.bottom > 0
    );
}

// Function to handle scroll events
function handleScroll() {
    const sections = document.querySelectorAll(".fade-section");
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add("visible"); // Add visible class when in viewport
        } else {
            section.classList.remove("visible"); // Remove visible class when out of viewport
        }
    });
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

// Run the scroll handler on page load to catch sections already in view
handleScroll();

// Function to show the modal
function showModal(name) {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".modal-overlay");
    const modalMessage = modal.querySelector(".modal-message");

    // Set personalized message
    modalMessage.textContent = `Thank you, ${name}, for helping our cause! Your support means the world to us.`;

    // Display modal and overlay
    modal.style.display = "block";
    overlay.style.display = "block";

    // Automatically hide the modal after 3 seconds
    setTimeout(() => {
        modal.style.display = "none";
        overlay.style.display = "none";
    }, 3000);
}

// Handle petition form submission
document.getElementById("petition-form").addEventListener("submit", validateSignature);
