/**
 * Logo component that displays the app logo and title
 * @class
 * @description A component responsible for rendering the application logo and title.
 * Uses a PWA-optimized icon and responsive text styling.
 */
class Logo {
  /**
   * Creates an instance of Logo component.
   * @constructor
   * @description Initializes the Logo component and renders it in the designated container.
   */
  constructor() {
    /** @private @type {HTMLElement} The container element for the logo */
    this.container = document.getElementById("logo");
    this.render();
  }

  /**
   * Render the logo component
   * @description Renders the logo image and text into the container element.
   * Uses a 96x96 icon for optimal display quality across devices.
   * @private
   */
  render() {
    this.container.innerHTML = `            <div class="logo">                <img src="public/icons/icon-96x96.png" alt="Random Team Generator Logo" class="logo__image">
                <span class="logo__text">Teams Generator</span>
            </div>
        `;
  }
}
