/**
 * Logo component that displays the app logo and title
 */
class Logo {
  /**
   * Initialize logo component
   */
  constructor() {
    this.container = document.getElementById("logo");
    this.render();
  }

  /**
   * Render the logo component
   */
  render() {
    this.container.innerHTML = `
      <div class="logo">
        <img src="public/icons/icon-96x96.png" alt="Random Team Generator Logo" class="logo__image">
      </div>
    `;
  }
}
