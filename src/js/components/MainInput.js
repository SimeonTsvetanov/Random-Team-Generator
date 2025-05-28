/**
 * Main input component that coordinates team generation
 */
class MainInput {
  constructor() {
    this.container = document.getElementById("main-input");
    this.namesList = document.createElement("div");
    this.namesList.className = "names-list";
    this.textArea = document.getElementById("names-input");
    this.teamsCount = document.getElementById("teams-count");
    this.generateButton = document.getElementById("generate-teams");
    this.decreaseButton = document.getElementById("decrease-teams");
    this.increaseButton = document.getElementById("increase-teams");

    // Replace textarea with names list
    this.textArea.parentNode.insertBefore(this.namesList, this.textArea);
    this.textArea.style.display = "none";

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
    this.generateButton.addEventListener("click", () => this.generateTeams());

    // Start with a single empty input
    this.addNameInput();

    // Load and set initial team count
    const lastTeamCount = StorageManager.get(
      StorageManager.KEYS.LAST_TEAM_COUNT,
      2
    );
    this.teamsCount.value = lastTeamCount;

    // Handle team count changes
    this.decreaseButton.addEventListener("click", () => {
      const currentValue = parseInt(this.teamsCount.value) || 2;
      this.updateTeamCount(currentValue - 1);
    });

    this.increaseButton.addEventListener("click", () => {
      const currentValue = parseInt(this.teamsCount.value) || 2;
      this.updateTeamCount(currentValue + 1);
    });

    // Handle manual input
    this.teamsCount.addEventListener("input", (e) => {
      // Allow empty input while typing
      if (e.target.value === "") {
        this.teamsCount.value = "";
        return;
      }
      this.updateTeamCount(e.target.value);
    });

    // Validate on blur
    this.teamsCount.addEventListener("blur", () => {
      const value = this.teamsCount.value;
      if (value === "" || isNaN(parseInt(value)) || parseInt(value) < 2) {
        this.updateTeamCount(2);
      }
    });

    // Handle input changes
    this.namesList.addEventListener("input", (e) => {
      const input = e.target;
      if (input.tagName === "INPUT") {
        const item = input.closest(".name-item");
        const deleteButton = item.querySelector(".delete-name");

        // Show/hide delete button based on input content
        if (input.value.trim()) {
          deleteButton.style.visibility = "visible";

          // Check if this is the first input and contains the cheat code
          if (
            item === this.namesList.firstElementChild &&
            input.value.trim().toLowerCase() === "the followers"
          ) {
            setTimeout(() => this.activateCheatCode(), 300); // Small delay for better UX
            return;
          }
        } else {
          deleteButton.style.visibility = "hidden";
        }

        this.saveNames();
      }
    });

    // Handle delete button clicks
    this.namesList.addEventListener("click", (e) => {
      if (e.target.closest(".delete-name")) {
        const item = e.target.closest(".name-item");
        if (item) {
          // If it's not the last input, remove it
          if (item !== this.namesList.lastElementChild) {
            item.remove();
          } else {
            // If it's the last input, just clear it
            const input = item.querySelector(".name-input");
            input.value = "";
            item.querySelector(".delete-name").style.visibility = "hidden";
          }
          this.saveNames();
          this.participantCounter.updateCount();
        }
      }
    });

    // Handle enter key
    this.namesList.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const currentInput = e.target;
        const currentValue = currentInput.value.trim();

        // Only create new input if current has content
        if (currentValue) {
          const currentItem = currentInput.closest(".name-item");
          const isLast = currentItem === this.namesList.lastElementChild;

          // Always create new input when pressing enter on a filled input
          this.addNameInput();

          // Focus the new input
          const nextInput =
            this.namesList.lastElementChild.querySelector(".name-input");
          nextInput.focus();
        }
      }
    });
  }
  /**
   * Add a new name input field
   * @param {string} [value=""] - Initial value for the input
   */
  addNameInput(value = "") {
    const item = document.createElement("div");
    item.className = "name-item";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "name-input";
    input.value = value;
    input.placeholder = "Enter name...";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-name";
    deleteButton.innerHTML = "×"; // Using × instead of material icon for simpler appearance
    deleteButton.style.visibility = value ? "visible" : "hidden";

    item.appendChild(input);
    item.appendChild(deleteButton);
    this.namesList.appendChild(item);

    if (!value) {
      input.focus();
    }
  }
  /**
   * Save all names to storage
   */
  saveNames() {
    const nameInputs = Array.from(
      this.namesList.querySelectorAll(".name-input")
    );
    let names = nameInputs
      .map((input) => input.value.trim())
      .filter((name) => name.length > 0);

    // Check for "the followers" cheat code
    if (names.length > 0 && names[0].toLowerCase() === "the followers") {
      this.activateCheatCode();
      return; // Skip the rest of the save process
    }

    const namesText = names.join("\n");
    StorageManager.save(StorageManager.KEYS.SAVED_NAMES, namesText);
    this.textArea.value = namesText; // Keep hidden textarea in sync
    this.participantCounter.updateCount();
  }

  /**
   * Activate cheat code to fill in predefined list of names
   */
  activateCheatCode() {
    const friendNames = [
      "Simeon",
      "Iliyana",
      "George",
      "Viki",
      "Eli",
      "Asen",
      "Lubomir",
      "Ralica",
      "Venci",
      "Slavi",
      "Djoni",
      "Apapa",
      "Mitaka G",
      "Antonio",
      "Dinkata",
      "Raiko",
      "Tancheto",
    ];

    // Clear existing name inputs
    this.namesList.innerHTML = "";

    // Add each friend
    friendNames.forEach((name) => {
      this.addNameInput(name);
    });

    // Add one empty input at the end
    this.addNameInput();

    // Update text area with friend list
    this.textArea.value = friendNames.join("\n");
    this.participantCounter.updateCount();

    // Save to storage
    StorageManager.save(StorageManager.KEYS.SAVED_NAMES, this.textArea.value);
  }
  /**
   * Update team count with validation
   * @param {number|string} value - New value for team count
   */
  updateTeamCount(value) {
    let newValue = parseInt(value);
    if (isNaN(newValue) || newValue < 2) {
      newValue = 2;
    }
    this.teamsCount.value = newValue;
    StorageManager.save(StorageManager.KEYS.LAST_TEAM_COUNT, newValue);
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
