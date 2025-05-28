/**
 * Theme switch component that handles theme toggling
 */
class ThemeSwitch {
  constructor() {
    this.container = document.getElementById("theme-switch");
    this.currentTheme = StorageManager.get(StorageManager.KEYS.THEME, "dark");
    this.init();
  }

  /**
   * Initialize the theme switch
   */
  init() {
    // Create switch HTML
    this.container.innerHTML = `
            <label class="theme-switch">
                <input type="checkbox" class="theme-switch__toggle" ${
                  this.currentTheme === "light" ? "checked" : ""
                }>
            </label>
        `;

    // Apply initial theme
    this.applyTheme(this.currentTheme);

    // Add event listener
    this.container
      .querySelector(".theme-switch__toggle")
      .addEventListener("change", (e) => this.handleThemeChange(e));
  }

  /**
   * Handle theme change event
   * @param {Event} event - Change event
   */
  handleThemeChange(event) {
    const theme = event.target.checked ? "light" : "dark";
    this.applyTheme(theme);
    StorageManager.save(StorageManager.KEYS.THEME, theme);
  }

  /**
   * Apply theme to document
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  applyTheme(theme) {
    document.body.dataset.theme = theme;
    // Update meta theme-color
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", theme === "dark" ? "#1a1a1a" : "#ffffff");
  }
}
