/**
 * Component that displays the number of valid participants
 */
class ParticipantCounter {
  constructor() {
    this.container = document.getElementById("participant-counter");
    this.textArea = document.getElementById("names-input");
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
    this.container.textContent = `${names.length} participants`;
    this.container.classList.toggle("hidden", names.length === 0);
  }
}
