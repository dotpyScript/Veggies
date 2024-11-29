// import { showSuccess, showError } from "./toast_alert";
document.addEventListener("DOMContentLoaded", function () {
  // Color palettes for different texts
  const colorPalettes = [
    ["#ffffff", "#e0f2fe", "#bae6fd", "#7dd3fc"], // Blue-white gradient
    ["#ffffff", "#dcfce7", "#bbf7d0", "#86efac"], // Green-white gradient
    ["#ffffff", "#fef3c7", "#fde68a", "#fbbf24"], // Yellow-white gradient
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

// <!-- Optional: Add some custom CSS for cursor effect -->

// document.addEventListener("DOMContentLoaded", function () {
//   const registrationForm = document.getElementById("registrationForm");

//   // Validation function
//   function validateForm(event) {
//     event.preventDefault();

//     // Clear previous errors
//     clearErrors();

//     // Collect form data
//     const formData = {
//       firstName: document.querySelector('input[placeholder="Farmer"]'),
//       lastName: document.querySelector('input[placeholder="Green"]'),
//       email: document.querySelector('input[placeholder="farmer@veggis.com"]'),
//       password: document.getElementById("password"),
//       termsCheckbox: document.querySelector('input[type="checkbox"]'),
//     };

//     let isValid = true;

//     // Validate First Name
//     if (!formData.firstName.value.trim()) {
//       showErrors(formData.firstName, "First name is required");
//       isValid = false;
//     }

//     // Validate Last Name
//     if (!formData.lastName.value.trim()) {
//       showErrors(formData.lastName, "Last name is required");
//       isValid = false;
//     }

//     // Validate Email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.value.trim()) {
//       showErrors(formData.email, "Email is required");
//       isValid = false;
//     } else if (!emailRegex.test(formData.email.value.trim())) {
//       showErrors(formData.email, "Please enter a valid email address");
//       isValid = false;
//     }

//     // Validate Password
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     if (!formData.password.value) {
//       showErrors(formData.password, "Password is required");
//       isValid = false;
//     } else if (formData.password.value.length < 8) {
//       showErrors(
//         formData.password,
//         "Password must be at least 8 characters long"
//       );
//       isValid = false;
//     } else if (!passwordRegex.test(formData.password.value)) {
//       showErrors(
//         formData.password,
//         "Password must include letters, numbers, and special characters"
//       );
//       isValid = false;
//     }

//     // Validate Terms Checkbox
//     if (!formData.termsCheckbox.checked) {
//       showErrors(
//         formData.termsCheckbox,
//         "You must agree to the terms and conditions"
//       );
//       isValid = false;
//     }

//     // If not valid, focus on first error
//     if (!isValid) {
//       focusFirstError();
//       return;
//     }

//     // If valid, proceed with form submission
//     console.log("Form is valid. Proceeding with registration...");
//     performRegistration(formData);
//   }

//   // Error display function
//   function showErrors(inputElement, message) {
//     // Add error styling to input
//     inputElement.classList.add("border-red-500", "focus:ring-red-500");

//     // Create error message element
//     const errorElement = document.createElement("small");
//     errorElement.className = "text-red-500 text-sm mt-1 block";
//     errorElement.textContent = message;

//     // Insert error message after input
//     const formGroup = inputElement.closest("div");
//     formGroup.appendChild(errorElement);
//   }

//   // Clear errors function
//   function clearErrors() {
//     // Remove all error messages
//     const errorMessages = document.querySelectorAll("small.text-red-500");
//     errorMessages.forEach((el) => el.remove());

//     // Remove error styling from inputs
//     const errorInputs = document.querySelectorAll(".border-red-500");
//     errorInputs.forEach((el) => {
//       el.classList.remove("border-red-500", "focus:ring-red-500");
//     });
//   }

//   // Focus on first error function
//   function focusFirstError() {
//     const firstErrorInput = document.querySelector(".border-red-500");
//     if (firstErrorInput) {
//       firstErrorInput.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//       firstErrorInput.focus();
//     }
//   }

//   // Password visibility toggle
//   const passwordInput = document.getElementById("password");
//   const togglePasswordBtn = document.getElementById("togglePassword");

//   togglePasswordBtn.addEventListener("click", function () {
//     const type = passwordInput.type === "password" ? "text" : "password";
//     passwordInput.type = type;

//     // Toggle eye icon
//     this.innerHTML =
//       type === "password"
//         ? '<i class="ri-eye-line"></i>'
//         : '<i class="ri-eye-off-line"></i>';
//   });

//   // Social Login Buttons Event Listeners
//   const socialLoginButtons = document.querySelectorAll(
//     ".flex.justify-center.space-x-4 button"
//   );
//   socialLoginButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const platform = this.querySelector("i").classList.contains(
//         "ri-google-fill"
//       )
//         ? "Google"
//         : this.querySelector("i").classList.contains("ri-plant-line")
//         ? "Plant Network"
//         : "Facebook";

//       console.log(`Attempting to register with ${platform}`);
//       // Implement social registration logic here
//       // This might involve redirecting to OAuth endpoint or triggering a specific registration flow
//     });
//   });

//   // Add form submission event listener
//   registrationForm.addEventListener("submit", validateForm);

//   // Optional: Add real-time validation on input
//   const inputFields = registrationForm.querySelectorAll(
//     'input:not([type="checkbox"]):not([type="button"])'
//   );
//   inputFields.forEach((input) => {
//     input.addEventListener("blur", function () {
//       // Clear previous errors for this input
//       const previousError = this.nextElementSibling;
//       if (previousError && previousError.classList.contains("text-red-500")) {
//         previousError.remove();
//       }

//       // Validate the input
//       validateForm({ preventDefault: () => {} });
//     });
//   });

//   // Registration submission function
//   function performRegistration(formData) {
//     // Prepare registration data
//     const registrationData = {
//       firstName: formData.firstName.value,
//       lastName: formData.lastName.value,
//       email: formData.email.value,
//       password: formData.password.value,
//     };

//     // Implement your registration logic here
//     // This could be an AJAX call to your backend
//     fetch("/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(registrationData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           // Redirect or update UI for successful registration
//           showSuccess(data.success || "Registration Suceessful", 1700);
//           setTimeout(() => {
//             location.href = "/index"; // Redirect to index after alert
//           }, 2000); // Wait 2 seconds
//         } else {
//           // Show registration error
//           showError(formData.email, data.message || "Registration failed");
//         }
//       })
//       .catch((error) => {
//         console.error("Registration error:", error);
//         showError(formData.email, "An unexpected error occurred");
//       });
//   }
// });

// // Google and Facebook Authentication Handler
// // class SocialAuthHandler {
// //   constructor() {
// //     // Initialize configuration
// //     this.initializeConfig();
// //   }

// //   // Initialize configuration (replace with your actual credentials)
// //   initializeConfig() {
// //     // Google OAuth Configuration
// //     this.googleConfig = {
// //       clientId: "YOUR_GOOGLE_CLIENT_ID",
// //       redirectUri: "https://your-domain.com/auth/google/callback",
// //       scope: "email profile openid",
// //     };

// //     // Facebook OAuth Configuration
// //     this.facebookConfig = {
// //       appId: "YOUR_FACEBOOK_APP_ID",
// //       redirectUri: "https://your-domain.com/auth/facebook/callback",
// //       scope: "email public_profile",
// //     };
// //   }

// //   // Google Authentication Method
// //   async initiateGoogleSignIn() {
// //     try {
// //       // Option 1: Using Google Identity Services
// //       const googleAuthUrl =
// //         `https://accounts.google.com/o/oauth2/v2/auth?` +
// //         `client_id=${this.googleConfig.clientId}` +
// //         `&redirect_uri=${this.googleConfig.redirectUri}` +
// //         `&response_type=code` +
// //         `&scope=${encodeURIComponent(this.googleConfig.scope)}` +
// //         `&access_type=offline` +
// //         `&prompt=consent`;

// //       // Redirect to Google Authentication
// //       window.location.href = googleAuthUrl;
// //     } catch (error) {
// //       this.handleAuthError("Google", error);
// //     }
// //   }

// //   // Facebook Authentication Method
// //   async initiateFacebookSignIn() {
// //     try {
// //       // Option 1: Facebook OAuth Redirect
// //       const facebookAuthUrl =
// //         `https://www.facebook.com/v12.0/dialog/oauth?` +
// //         `client_id=${this.facebookConfig.appId}` +
// //         `&redirect_uri=${this.facebookConfig.redirectUri}` +
// //         `&response_type=code` +
// //         `&scope=${encodeURIComponent(this.facebookConfig.scope)}`;

// //       // Redirect to Facebook Authentication
// //       window.location.href = facebookAuthUrl;
// //     } catch (error) {
// //       this.handleAuthError("Facebook", error);
// //     }
// //   }

// //   // Backend Authentication Verification
// //   async verifyAuthToken(platform, authCode) {
// //     try {
// //       const response = await fetch("/api/auth/verify", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           platform,
// //           authCode,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (data.success) {
// //         // Successful authentication
// //         this.handleSuccessfulAuthentication(data.user);
// //       } else {
// //         // Authentication failed
// //         this.handleAuthenticationFailure(data.error);
// //       }
// //     } catch (error) {
// //       this.handleAuthError(platform, error);
// //     }
// //   }

// //   // Success Authentication Handler
// //   handleSuccessfulAuthentication(userData) {
// //     // Store user data in local storage or session
// //     localStorage.setItem("user", JSON.stringify(userData));

// //     // Redirect to dashboard or complete registration
// //     window.location.href = "/index";
// //   }

// //   // Authentication Failure Handler
// //   handleAuthenticationFailure(error) {
// //     // Display error message
// //     this.showErrorNotification(error);
// //   }

// //   // Error Handling Method
// //   handleAuthError(platform, error) {
// //     console.error(`${platform} Authentication Error:`, error);

// //     // Show user-friendly error
// //     this.showErrorNotification(
// //       `Failed to authenticate with ${platform}. Please try again.`
// //     );
// //   }

// //   // Error Notification Method
// //   showErrorNotification(message) {
// //     // Create and display error notification
// //     const notificationContainer = document.createElement("div");
// //     notificationContainer.className = `
// //             fixed top-4 right-4 bg-red-500 text-white
// //             px-4 py-2 rounded-lg shadow-lg z-50
// //         `;
// //     notificationContainer.textContent = message;

// //     document.body.appendChild(notificationContainer);

// //     // Remove notification after 3 seconds
// //     setTimeout(() => {
// //       document.body.removeChild(notificationContainer);
// //     }, 3000);
// //   }
// // }

// class SocialAuthHandler {
//   constructor() {
//     this.setupSocialLoginListeners();
//   }

//   setupSocialLoginListeners() {
//     const googleSignInBtn = document.querySelector(".google-signin");
//     const facebookSignInBtn = document.querySelector(".facebook-signin");

//     if (googleSignInBtn) {
//       googleSignInBtn.addEventListener("click", () =>
//         this.initiateGoogleSignIn()
//       );
//     }

//     if (facebookSignInBtn) {
//       facebookSignInBtn.addEventListener("click", () =>
//         this.initiateFacebookSignIn()
//       );
//     }
//   }

//   initiateGoogleSignIn() {
//     // Redirect to Passport Google authentication route
//     window.location.href = "/auth/google";
//   }

//   initiateFacebookSignIn() {
//     // Redirect to Passport Facebook authentication route
//     window.location.href = "/auth/facebook";
//   }

//   handleAuthenticationCallback() {
//     // Check URL for authentication status
//     const urlParams = new URLSearchParams(window.location.search);
//     const authStatus = urlParams.get("auth");

//     if (authStatus === "success") {
//       this.showSuccessNotification("Successfully logged in");
//       // Optional: Redirect to dashboard or home page
//       showSuccess(authStatus.message || "successfully Login", 1700);
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 3000);
//     } else if (authStatus === "failure") {
//       this.showErrorNotification("Authentication failed");
//     }
//   }

//   showSuccessNotification(message) {
//     this.createNotification(message, "bg-green-500");
//   }

//   showErrorNotification(message) {
//     this.createNotification(message, "bg-red-500");
//   }

//   createNotification(message, bgClass) {
//     const notification = document.createElement("div");
//     notification.className = `
//         fixed top-4 right-4 ${bgClass} text-white
//         px-4 py-2 rounded-lg shadow-lg z-50
//       `;
//     notification.textContent = message;

//     document.body.appendChild(notification);

//     setTimeout(() => {
//       document.body.removeChild(notification);
//     }, 3000);
//   }
// }

// // Initialize Authentication Components
// const authManager = new AuthenticationManager();
// const socialAuthHandler = new SocialAuthHandler();

// // Handle any authentication callbacks
// socialAuthHandler.handleAuthenticationCallback();

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  // Validation function
  function validateForm(event) {
    event.preventDefault();
    clearErrors();

    const formData = {
      firstName: document.querySelector('input[placeholder="Farmer"]'),
      lastName: document.querySelector('input[placeholder="Green"]'),
      email: document.querySelector('input[placeholder="farmer@veggis.com"]'),
      password: document.getElementById("password"),
      termsCheckbox: document.querySelector('input[type="checkbox"]'),
    };

    let isValid = true;

    // Validate First Name
    if (!formData.firstName.value.trim()) {
      showErrors(formData.firstName, "First name is required");
      isValid = false;
    }

    // Validate Last Name
    if (!formData.lastName.value.trim()) {
      showErrors(formData.lastName, "Last name is required");
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.value.trim()) {
      showErrors(formData.email, "Email is required");
      isValid = false;
    } else if (!emailRegex.test(formData.email.value.trim())) {
      showErrors(formData.email, "Please enter a valid email address");
      isValid = false;
    }

    // Validate Password
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!formData.password.value) {
      showErrors(formData.password, "Password is required");
      isValid = false;
    } else if (!passwordRegex.test(formData.password.value)) {
      showErrors(
        formData.password,
        "Password must include letters, numbers, and special characters"
      );
      isValid = false;
    }

    // Validate Terms Checkbox
    if (!formData.termsCheckbox.checked) {
      showErrors(
        formData.termsCheckbox,
        "You must agree to the terms and conditions"
      );
      isValid = false;
    }

    if (isValid) {
      performRegistration(formData);
    } else {
      focusFirstError();
    }
  }

  // Clear errors function
  function clearErrors() {
    const errorMessages = document.querySelectorAll("small.text-red-500");
    errorMessages.forEach((el) => el.remove());
    const errorInputs = document.querySelectorAll(".border-red-500");
    errorInputs.forEach((el) =>
      el.classList.remove("border-red-500", "focus:ring-red-500")
    );
  }

  // Focus on first error
  function focusFirstError() {
    const firstErrorInput = document.querySelector(".border-red-500");
    if (firstErrorInput) {
      firstErrorInput.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorInput.focus();
    }
  }

  // Perform registration
  function performRegistration(formData) {
    const registrationData = {
      firstName: formData.firstName.value,
      lastName: formData.lastName.value,
      email: formData.email.value,
      password: formData.password.value,
    };

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showSucess(data.message || "Registration successful!", 2000);
          setTimeout(() => {
            location.href = "/login";
          }, 3000);
        } else {
          showError(data.message || "Registration failed", 2000);
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        showError("An unexpected error occurred. Please try again.", 2000);
      });
  }

  // Show errors
  function showErrors(inputElement, message) {
    inputElement.classList.add("border-red-500", "focus:ring-red-500");
    const errorElement = document.createElement("small");
    errorElement.className = "text-red-500 text-sm mt-1 block";
    errorElement.textContent = message;
    inputElement.closest("div").appendChild(errorElement);
  }

  // Attach event listener
  if (registrationForm) {
    registrationForm.addEventListener("submit", validateForm);
  }

  // Social Authentication
  const socialAuthHandler = {
    initiateGoogleSignIn() {
      window.location.href = "/auth/google";
    },
    initiateFacebookSignIn() {
      window.location.href = "/auth/facebook";
    },
  };

  document
    .querySelector(".google-signin")
    ?.addEventListener("click", socialAuthHandler.initiateGoogleSignIn);

  document
    .querySelector(".facebook-signin")
    ?.addEventListener("click", socialAuthHandler.initiateFacebookSignIn);
});
