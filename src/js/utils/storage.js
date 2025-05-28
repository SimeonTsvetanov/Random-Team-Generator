/**
 * Utility class for handling local storage operations
 */
class StorageManager {  static KEYS = {
    THEME: "rta-theme-preference",
    SAVED_NAMES: "rta-saved-names",
    LAST_TEAM_COUNT: "rta-last-team-count"
  };

  /**
   * Save a value to local storage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  static save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  /**
   * Retrieve a value from local storage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} Stored value or default value
   */
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  }
}
