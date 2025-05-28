/**
 * Component that tracks the number of valid participants
 */
class ParticipantCounter {
  constructor() {
    this.textArea = document.getElementById("names-input");
    this.count = 0;
    this.init();
  }

  /**
   * Initialize the counter
   */
  init() {
    this.updateCount();
    this.textArea.addEventListener("input", () => this.updateCount());
  }

  /**
   * Update the participant count
   */
  updateCount() {
    const names = InputValidator.getValidNames(this.textArea.value);
    this.count = names.length;
  }

  /**
   * Get current count
   * @returns {number} Current number of valid participants
   */
  getCount() {
    return this.count;
  }
}
