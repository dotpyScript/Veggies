// TypeWriter.js - A versatile typing animation utility
class TypeWriter {
  /**
   * Create a new TypeWriter instance
   * @param {Object} config - Configuration object
   * @param {HTMLElement} config.element - Target element for typing
   * @param {string[]} config.texts - Array of texts to type
   * @param {Object} [options] - Optional configuration
   * @param {number} [options.speed=100] - Typing speed
   * @param {number} [options.pause=2000] - Pause between texts
   * @param {boolean} [options.loop=true] - Whether to loop through texts
   * @param {boolean} [options.gradient=true] - Apply color gradient
   * @param {string[][]} [options.colorPalettes] - Custom color palettes
   */
  constructor(config, options = {}) {
    // Validate input
    if (!config.element || !config.texts || config.texts.length === 0) {
      console.error("Invalid TypeWriter configuration");
      return;
    }

    // Default configuration
    this.element = config.element;
    this.texts = config.texts;
    this.options = {
      speed: options.speed || 100,
      pause: options.pause || 2000,
      loop: options.loop ?? true,
      gradient: options.gradient ?? true,
      colorPalettes: options.colorPalettes || [
        ["#ffffff", "#e0f2fe", "#bae6fd", "#7dd3fc"], // Blue-white
        ["#ffffff", "#dcfce7", "#bbf7d0", "#86efac"], // Green-white
        ["#ffffff", "#fef3c7", "#fde68a", "#fbbf24"], // Yellow-white
        ["#ffffff", "#f0abfc", "#e879f9", "#d946ef"], // Purple-white
        ["#ffffff", "#fca5a5", "#f87171", "#ef4444"], // Red-white
      ],
    };

    // Typing state
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.colorPalette = this.getRandomPalette();

    // Start typing
    this.type();
  }

  // Get a random color palette
  getRandomPalette() {
    return this.options.colorPalettes[
      Math.floor(Math.random() * this.options.colorPalettes.length)
    ];
  }

  // Create gradient text
  getGradientText(text) {
    if (!this.options.gradient) {
      return text;
    }

    return text
      .split("")
      .map((char, index) => {
        const colorIndex = Math.min(
          Math.floor(index / (text.length / this.colorPalette.length)),
          this.colorPalette.length - 1
        );
        return `<span style="color: ${this.colorPalette[colorIndex]}">${char}</span>`;
      })
      .join("");
  }

  // Main typing method
  type() {
    const currentText = this.texts[this.textIndex];

    if (!this.isDeleting) {
      // Typing
      const visibleText = currentText.substring(0, this.charIndex + 1);
      this.element.innerHTML = this.getGradientText(visibleText);
      this.charIndex++;

      if (this.charIndex === currentText.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.options.pause);
      } else {
        setTimeout(() => this.type(), this.options.speed);
      }
    } else {
      // Deleting
      this.charIndex--;
      const visibleText = currentText.substring(0, this.charIndex);
      this.element.innerHTML = this.getGradientText(visibleText);

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.texts.length;

        // Change color palette
        this.colorPalette = this.getRandomPalette();

        // Check if we should continue looping
        if (!this.options.loop && this.textIndex === 0) {
          return; // Stop typing
        }

        setTimeout(() => this.type(), this.options.speed);
      } else {
        setTimeout(() => this.type(), this.options.speed / 2);
      }
    }
  }

  // Static method to add cursor effect
  static addCursorEffect(element) {
    element.classList.add("typewriter-cursor");
  }
}

// Optional: Global CSS for cursor effect
const style = document.createElement("style");
style.textContent = `
    .typewriter-cursor::after {
        content: '|';
        animation: blink 0.7s infinite;
        display: inline-block;
        margin-left: 3px;
        opacity: 1;
        color: white;
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Usage Examples
document.addEventListener("DOMContentLoaded", () => {
  // Home Page Example
  const homeTitle = document.querySelector(".home-title");
  if (homeTitle) {
    new TypeWriter({
      element: homeTitle,
      texts: [
        "Welcome to Veggis",
        "Agricultural Management",
        "Farming Reimagined",
      ],
    });
    TypeWriter.addCursorEffect(homeTitle);
  }

  // Login Page Example
  const loginTitle = document.querySelector(".login-title");
  if (loginTitle) {
    new TypeWriter(
      {
        element: loginTitle,
        texts: ["Welcome Back", "Secure Login", "Manage Your Account"],
      },
      {
        speed: 80,
        pause: 1500,
        gradient: false, // Optional: disable gradient
      }
    );
    TypeWriter.addCursorEffect(loginTitle);
  }

  // Dashboard Example
  const dashboardGreeting = document.querySelector(".dashboard-greeting");
  if (dashboardGreeting) {
    new TypeWriter(
      {
        element: dashboardGreeting,
        texts: [
          "Good Morning, Farmer!",
          "Ready to Manage Your Crops?",
          "Let's Get Started",
        ],
      },
      {
        loop: false, // Stop after one cycle
        pause: 2000,
      }
    );
  }
});

// Export for module usage
export default TypeWriter;
