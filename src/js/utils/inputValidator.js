/**
 * Utility class for validating input and counting participants
 */
class InputValidator {
  /**
   * Count valid names from input text
   * @param {string} inputText - Raw input text
   * @returns {string[]} Array of valid names
   */
  static getValidNames(inputText) {
    return inputText
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  }

  /**
   * Validate if teams can be created with given parameters
   * @param {string[]} names - Array of valid names
   * @param {number} teamCount - Number of teams
   * @returns {Object} Validation result and error message
   */
  static validateTeamCreation(names, teamCount) {
    const result = {
      isValid: true,
      message: "",
    };

    if (names.length < 2) {
      result.isValid = false;
      result.message = "Please enter at least two names!";
      return result;
    }

    if (names.length < teamCount) {
      result.isValid = false;
      result.message = `I can't split ${names.length} people into ${teamCount} groups`;
      return result;
    }

    return result;
  }
}
