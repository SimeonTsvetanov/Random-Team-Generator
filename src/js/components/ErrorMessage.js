/**
 * Component for displaying error messages with animation
 */
class ErrorMessage {
  constructor() {
    this.container = document.getElementById("error-message");
    this.messageText = this.container.querySelector(".error-message__text");
    this.okButton = this.container.querySelector(".error-message__button");
    this.timeoutId = null;

    // Initialize the OK button click handler
    this.okButton.addEventListener("click", () => this.hide());
  }
  /**
   * Show error message with auto-hide
   * @param {string} message - Error message to display
   * @param {number} duration - Duration in ms to show the message
   */
  show(message, duration = 3000) {
    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    // Set the "Яваш Бре!" text and the actual error message
    this.messageText.innerHTML =
      '<div class="yavash-bre">Яваш Бре!</div><div class="error-text">' +
      message +
      "</div>";

    this.container.classList.remove("hidden");
    this.container.classList.add("fade-in");

    // Auto-hide after duration
    this.timeoutId = setTimeout(() => {
      this.hide();
    }, duration);
  }

  /**
   * Hide the error message
   */
  hide() {
    this.container.classList.add("fade-out");
    setTimeout(() => {
      this.container.classList.add("hidden");
      this.container.classList.remove("fade-in", "fade-out");
    }, 300); // Match animation duration
  }
}
