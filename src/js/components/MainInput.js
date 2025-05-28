/**
 * Main input component that coordinates team generation
 */
class MainInput {
  constructor() {
    this.container = document.getElementById("main-input");
    this.textArea = document.getElementById("names-input");
    this.teamsCount = document.getElementById("teams-count");
    this.generateButton = document.getElementById("generate-teams");
    this.decreaseButton = document.getElementById("decrease-teams");
    this.increaseButton = document.getElementById("increase-teams");

    // Initialize sub-components
    this.participantCounter = new ParticipantCounter();
    this.errorMessage = new ErrorMessage();
    this.teamDisplay = new TeamDisplay();

    this.init();
  }

  /**
   * Initialize event listeners
   */
  init() {
    this.generateButton.addEventListener("click", () => this.generateTeams());    // Load saved names if any
    const savedNames = StorageManager.get(StorageManager.KEYS.SAVED_NAMES, "");
    if (savedNames) {
      this.textArea.value = savedNames;
      this.participantCounter.updateCount();
    }

    // Load last team count if any
    const lastTeamCount = StorageManager.get(StorageManager.KEYS.LAST_TEAM_COUNT, 2);
    this.teamsCount.value = lastTeamCount;

    // Save names on input
    this.textArea.addEventListener("input", () => {
      StorageManager.save(StorageManager.KEYS.SAVED_NAMES, this.textArea.value);
    });

    // Handle team count changes
    this.decreaseButton.addEventListener("click", () =>
      this.updateTeamCount(-1)
    );
    this.increaseButton.addEventListener("click", () =>
      this.updateTeamCount(1)
    );
  }

  /**
   * Update team count with bounds checking
   * @param {number} change - Amount to change (-1 or 1)
   */  updateTeamCount(change) {
    const currentValue = parseInt(this.teamsCount.value);
    const newValue = currentValue + change;
    if (newValue >= 2) {
      // Ensure minimum of 2 teams
      this.teamsCount.value = newValue;
      // Save team count preference
      StorageManager.save(StorageManager.KEYS.LAST_TEAM_COUNT, newValue);
    }
  }

  /**
   * Generate and display teams
   */
  generateTeams() {
    const names = InputValidator.getValidNames(this.textArea.value);
    const teamCount = parseInt(this.teamsCount.value);

    // Validate input
    const validation = InputValidator.validateTeamCreation(names, teamCount);
    if (!validation.isValid) {
      this.errorMessage.show(validation.message);
      return;
    }

    // Generate and display teams
    const teams = TeamGenerator.generateTeams(names, teamCount);
    this.teamDisplay.displayTeams(teams);
  }
}
