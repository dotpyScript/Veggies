document.addEventListener("DOMContentLoaded", function () {
  // Color palettes for different texts
  const colorPalettes = [
    ["#ffffff", "#e0f2fe", "#bae6fd", "#7dd3fc"],
    ["#ffffff", "#dcfce7", "#bbf7d0", "#86efac"],
    ["#ffffff", "#fef3c7", "#fde68a", "#fbbf24"],
    ["#ffffff", "#c9fec7", "#94fa90", "#2dfc26"],
  ];

  class TypeWriter {
    constructor(element, texts, speed = 100, pause = 2000) {
      this.element = element;
      this.texts = texts;
      this.speed = speed;
      this.pause = pause;
      this.textIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.colorPalette = this.getRandomPalette();
      this.type();
    }

    getRandomPalette() {
      return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    }

    getGradientText(text) {
      return text
        .split("")
        .map((char, index) => {
          // Calculate color based on character position
          const colorIndex = Math.min(
            Math.floor(index / (text.length / this.colorPalette.length)),
            this.colorPalette.length - 1
          );
          return `<span style="color: ${this.colorPalette[colorIndex]}">${char}</span>`;
        })
        .join("");
    }

    type() {
      const currentText = this.texts[this.textIndex];

      if (!this.isDeleting) {
        // Gradually reveal text with gradient
        const visibleText = currentText.substring(0, this.charIndex + 1);
        this.element.innerHTML = this.getGradientText(visibleText);
        this.charIndex++;

        if (this.charIndex === currentText.length) {
          this.isDeleting = true;
          setTimeout(() => this.type(), this.pause);
        } else {
          setTimeout(() => this.type(), this.speed);
        }
      } else {
        // Deleting text
        this.charIndex--;
        const visibleText = currentText.substring(0, this.charIndex);
        this.element.innerHTML = this.getGradientText(visibleText);

        if (this.charIndex === 0) {
          this.isDeleting = false;
          this.textIndex = (this.textIndex + 1) % this.texts.length;
          // Change color palette when switching texts
          this.colorPalette = this.getRandomPalette();
          setTimeout(() => this.type(), this.speed);
        } else {
          setTimeout(() => this.type(), this.speed / 2);
        }
      }
    }
  }

  // Select the elements
  const titleElement = document.querySelector(".absolute.inset-0 h2");
  const subtitleElement = document.querySelector(".absolute.inset-0 p");

  // Initialize typing animations
  if (titleElement) {
    new TypeWriter(
      titleElement,
      ["Welcome to Veggis", "Agricultural Management", "Farming Reimagined"],
      100,
      2000
    );
  }

  if (subtitleElement) {
    new TypeWriter(
      subtitleElement,
      [
        "Manage Your Agricultural Products Efficiently",
        "Streamline Your Farming Operations",
        "Smart Solutions for Modern Farmers",
      ],
      80,
      2000
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  class AuthenticationManager {
    constructor() {
      this.loginForm = document.querySelector("form");
      this.socialAuthHandler = new SocialAuthHandler();
      this.initializeEventListeners();
    }

    initializeEventListeners() {
      // Form Submission Listener
      if (this.loginForm) {
        this.loginForm.addEventListener(
          "submit",
          this.handleFormSubmission.bind(this)
        );
      }

      // Password Visibility Toggle
      const passwordInput = document.getElementById("password");
      const togglePasswordBtn = document.getElementById("togglePassword");

      if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener("click", () => {
          const type = passwordInput.type === "password" ? "text" : "password";
          passwordInput.type = type;
          togglePasswordBtn.innerHTML =
            type === "password"
              ? '<i class="ri-eye-line"></i>'
              : '<i class="ri-eye-off-line"></i>';
        });
      }

      // Real-time Input Validation
      this.setupRealTimeValidation();
    }

    handleFormSubmission(event) {
      event.preventDefault();
      this.clearPreviousErrors();

      const emailInput = this.loginForm.querySelector('input[type="email"]');
      const passwordInput = this.loginForm.querySelector(
        'input[type="password"]'
      );

      // Validation
      if (!this.validateInputs(emailInput, passwordInput)) return;

      // Proceed with login
      this.performLogin(emailInput.value, passwordInput.value);
    }

    validateInputs(emailInput, passwordInput) {
      let isValid = true;

      // Email Validation
      if (!emailInput.value.trim()) {
        this.showError(emailInput, "Email is required");
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        this.showError(emailInput, "Invalid email format");
        isValid = false;
      }

      // Password Validation
      if (!passwordInput.value) {
        this.showError(passwordInput, "Password is required");
        isValid = false;
      } else if (passwordInput.value.length < 8) {
        this.showError(passwordInput, "Password must be at least 8 characters");
        isValid = false;
      }

      return isValid;
    }

    performLogin(email, password) {
      this.showLoadingState(true);

      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.showLoadingState(false);

          if (data.status === "ok") {
            showSuccess(data.message || "successfully Login", 1700);
            setTimeout(() => {
              // window.location.href = "/index";
              location.href = data.redirect;
            }, 3000);
          } else {
            showError(data.message || "Login Failed", 1700);
          }
        })
        .catch((error) => {
          this.showLoadingState(false);
          console.error("Login error:", error);
          showError("Server Error", 1700);
        });
    }

    showError(inputElement, message) {
      // Remove any existing error
      this.clearPreviousErrors();

      // Add error styling
      inputElement.classList.add("border-red-500");

      // Create error message element
      const errorElement = document.createElement("div");
      errorElement.className = "text-red-500 text-sm mt-1";
      errorElement.textContent = message;

      // Insert error message after input
      inputElement.closest(".input-group").appendChild(errorElement);
    }

    clearPreviousErrors() {
      // Remove error messages
      const existingErrors = this.loginForm.querySelectorAll(".text-red-500");
      existingErrors.forEach((el) => el.remove());

      // Remove error styling
      const errorInputs = this.loginForm.querySelectorAll(".border-red-500");
      errorInputs.forEach((el) => el.classList.remove("border-red-500"));
    }

    showLoadingState(isLoading) {
      const submitButton = this.loginForm.querySelector(
        'button[type="submit"]'
      );
      if (isLoading) {
        submitButton.disabled = true;
        submitButton.innerHTML = "Logging in...";
      } else {
        submitButton.disabled = false;
        submitButton.innerHTML = "Login";
      }
    }

    setupRealTimeValidation() {
      if (!this.loginForm) return;

      const inputs = this.loginForm.querySelectorAll("input");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          this.clearPreviousErrors();
          this.validateInputs(
            this.loginForm.querySelector('input[type="email"]'),
            this.loginForm.querySelector('input[type="password"]')
          );
        });
      });
    }
  }

  // social media authentication
  class SocialAuthHandler {
    constructor() {
      this.setupSocialLoginListeners();
    }

    setupSocialLoginListeners() {
      const googleSignInBtn = document.querySelector(".google-signin");
      const facebookSignInBtn = document.querySelector(".facebook-signin");

      if (googleSignInBtn) {
        googleSignInBtn.addEventListener("click", () =>
          this.initiateGoogleSignIn()
        );
      }

      if (facebookSignInBtn) {
        facebookSignInBtn.addEventListener("click", () =>
          this.initiateFacebookSignIn()
        );
      }
    }

    initiateGoogleSignIn() {
      // Redirect to Passport Google authentication route
      window.location.href = "/auth/google";
    }

    initiateFacebookSignIn() {
      // Redirect to Passport Facebook authentication route
      window.location.href = "/auth/facebook";
    }

    handleAuthenticationCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get("status");

      if (status === "success") {
        showSuccess("Successfully logged in", 1700);
        setTimeout(() => {
          window.location.href = "/index";
        }, 3000);
      } else if (status === "failure") {
        showError("Authentication failed", 1700);
      }
    }

    showSuccessNotification(message) {
      this.createNotification(message, "bg-green-500");
    }

    showErrorNotification(message) {
      this.createNotification(message, "bg-red-500");
    }

    createNotification(message, bgClass) {
      const notification = document.createElement("div");
      notification.className = `
        fixed top-4 right-4 ${bgClass} text-white 
        px-4 py-2 rounded-lg shadow-lg z-50
      `;
      notification.textContent = message;

      document.body.appendChild(notification);

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
  }

  // Initialize Authentication Components
  const authManager = new AuthenticationManager();
  const socialAuthHandler = new SocialAuthHandler();

  // Handle any authentication callbacks
  socialAuthHandler.handleAuthenticationCallback();
});

// Main function to handle Google login callback
// fetch("/auth/google/callback")
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error("Login failed");
//     }
//     return res.json();
//   })
//   .then((data) => {
//     if (data.ok) {
//       showSuccess(data.message || "Successfully logged in", 1700);
//       setTimeout(() => {
//         window.location.href = "/index";
//       }, 3000);
//     } else {
//       showError(data.message || "Login failed", 1700);
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//     showError("Internal server error. Please try again later.", 1700);
//   });
