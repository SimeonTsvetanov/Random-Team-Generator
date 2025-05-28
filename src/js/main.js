/**
 * Main application entry point
 */
class App {
  constructor() {
    this.initComponents();
  }
  /**
   * Initialize all application components
   */
  initComponents() {
    // Initialize theme switch
    this.themeSwitch = new ThemeSwitch();

    // Initialize logo
    this.logo = new Logo();

    // Initialize main input (which initializes other components)
    this.mainInput = new MainInput();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
