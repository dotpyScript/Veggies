// Create toast container if it doesn't exist
let toastContainer = document.querySelector(".toast-container");
if (!toastContainer) {
  toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";
  document.body.appendChild(toastContainer);
}

// Animated SVG icons with stroke-dasharray for path animation
const icons = {
  success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                        <path d="M20 6L9 17L4 12" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>`,
  error: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`,
  warning: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>`,
  info: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>`,
};

// Main toast function
function toast(type, message, duration = 5000) {
  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
                ${icons[type] || icons.info}
                <p class="toast-message">${message}</p>
                <div class="toast-progress"></div>
            `;

  // Add to container
  toastContainer.appendChild(toast);

  // Vibrate device if supported
  if (window.navigator.vibrate) {
    window.navigator.vibrate(100);
  }

  // Handle click to dismiss
  toast.addEventListener("click", () => {
    dismissToast(toast);
  });

  // Reset progress bar animation on hover
  toast.addEventListener("mouseenter", () => {
    const progress = toast.querySelector(".toast-progress");
    progress.style.animationPlayState = "paused";
  });

  toast.addEventListener("mouseleave", () => {
    const progress = toast.querySelector(".toast-progress");
    progress.style.animationPlayState = "running";
  });

  // Auto dismiss after duration
  const timeoutId = setTimeout(() => {
    dismissToast(toast);
  }, duration);

  // Store the timeout ID on the element
  toast._timeoutId = timeoutId;

  // Return the toast element (useful for custom handling)
  return toast;
}

// Dismiss toast with animation
function dismissToast(toast) {
  // Clear the timeout to prevent duplicate dismissals
  if (toast._timeoutId) {
    clearTimeout(toast._timeoutId);
  }

  toast.classList.add("removing");
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}

// Helper functions for each toast type
const showSuccess = (message, duration) => toast("success", message, duration);
const showError = (message, duration) => toast("error", message, duration);
const showWarning = (message, duration) => toast("warning", message, duration);
const showInfo = (message, duration) => toast("info", message, duration);

// export { showSuccess, showError, showWarning, showInfo };
