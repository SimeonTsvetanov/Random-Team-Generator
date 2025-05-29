/**
 * TeamDisplay Component
 * Handles the display modal for generated teams with standardized animations
 * @author Simeon Tsvetanov
 */

/**
 * Component for displaying generated teams
 */
class TeamDisplay {
  constructor() {
    this.container = document.getElementById("teams-display");
    this.teamsContainer = this.container.querySelector(".teams-container");
    this.refreshButton = document.getElementById("refresh-teams");
    this.copyButton = document.getElementById("copy-teams");
    this.closeButton = document.getElementById("close-teams");
    this.currentTeams = [];
    this.teamColors = [
      "rgba(76, 175, 80, 0.1)", // Green
      "rgba(33, 150, 243, 0.1)", // Blue
      "rgba(156, 39, 176, 0.1)", // Purple
      "rgba(255, 152, 0, 0.1)", // Orange
      "rgba(233, 30, 99, 0.1)", // Pink
    ];
    this.init();
  }
  /**
   * Initialize event listeners
   */
  init() {
    this.refreshButton.addEventListener("click", () => this.refreshTeams());
    this.copyButton.addEventListener("click", () => this.copyTeams());
    this.closeButton.addEventListener("click", () => this.hide());

    // Close on background click
    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) {
        this.hide();
      }
    });
  }
  /**
   * Hide the modal with standardized animation timing
   */ hide() {
    // Hide content immediately, matching error message pattern
    const actions = this.container.querySelector(".actions");
    const teamBoxes = this.teamsContainer.querySelectorAll(".team-box");

    // Hide all content simultaneously
    actions.classList.remove("visible");
    teamBoxes.forEach((box) => {
      box.classList.remove("visible");
      box.classList.add("hidden");
    });

    // Hide modal after content animation completes
    setTimeout(() => {
      this.container.classList.add("hidden");

      // Clean up after modal is fully hidden
      this.teamsContainer.scrollTop = 0;
      // Reset all team boxes to hidden state for next opening
      teamBoxes.forEach((box) => {
        box.classList.remove("visible");
        box.classList.add("hidden");
      });
    }, 300); // Match error message timing
  }
  /**
   * Display teams in the modal with standardized animation timing
   * @param {string[][]} teams - Array of teams
   */ displayTeams(teams) {
    this.currentTeams = teams;

    // Show modal backdrop
    this.container.classList.remove("hidden");

    // Prepare teams content but keep everything hidden
    this.renderTeams();

    // Wait for backdrop to appear, then show content with standardized timing
    setTimeout(() => {
      const teamBoxes = this.teamsContainer.querySelectorAll(".team-box");
      const actions = this.container.querySelector(".actions");

      // Show all team boxes and actions simultaneously
      teamBoxes.forEach((box) => {
        box.classList.add("visible");
        box.classList.remove("hidden");
      });

      actions.classList.add("visible");
    }, 300); // Match error message timing
  }
  /**
   * Render teams in the container
   */ renderTeams() {
    this.teamsContainer.innerHTML = this.currentTeams
      .map((team, index) => {
        const colorIndex = index % this.teamColors.length;
        return `
                    <div class="team-box team-color-${colorIndex} hidden" id="team-${
          index + 1
        }">
                        <h3>Team ${index + 1}</h3>
                        <ul>
                            ${team.map((name) => `<li>${name}</li>`).join("")}
                        </ul>
                    </div>
                `;
      })
      .join("");
  }
  /**
   * Refresh teams with standardized animation timing
   */
  refreshTeams() {
    // Get all current names and shuffle them
    const allNames = this.currentTeams.flat();

    // Generate new teams
    const teamCount = this.currentTeams.length;
    const newTeams = TeamGenerator.generateTeams(allNames, teamCount);

    // Get animation elements
    const icon = this.refreshButton.querySelector(".material-icons");
    const teamBoxes = this.teamsContainer.querySelectorAll(".team-box");

    // Only proceed if not already animating
    if (!icon.classList.contains("spin-once")) {
      // Store current container height to prevent shrinking during animation
      const currentHeight = this.teamsContainer.offsetHeight;
      this.teamsContainer.style.setProperty(
        "--refresh-height",
        `${currentHeight}px`
      );

      // Add animations
      icon.classList.add("spin-once");
      teamBoxes.forEach((box) => box.classList.add("refresh"));
      // Hide scrollbar during animation
      this.teamsContainer.classList.add("refresh-animation");

      // Update teams after a short delay
      setTimeout(() => {
        // Update current teams
        this.currentTeams = newTeams;

        // Re-render teams
        this.renderTeams();

        // Remove animation class after rendering
        this.teamsContainer.querySelectorAll(".team-box").forEach((box) => {
          box.classList.remove("refresh");
        });

        // Apply entrance animation with consistent timing
        setTimeout(() => {
          this.teamsContainer.querySelectorAll(".team-box").forEach((box) => {
            box.classList.add("visible");
            box.classList.remove("hidden");
          });

          // Remove animation classes after animation completes
          setTimeout(() => {
            icon.classList.remove("spin-once");
            teamBoxes.forEach((box) => {
              box.classList.remove("refresh");
            });
            // Re-enable scrollbar and clear fixed height
            this.teamsContainer.classList.remove("refresh-animation");
            this.teamsContainer.style.removeProperty("--refresh-height");
          }, 300); // Match error message timing
        }, 100);
      }, 200);
    }
  }

  /**
   * Copy teams to clipboard with enhanced formatting
   */
  async copyTeams() {
    // Format teams with enhanced styling
    const formattedTeams = this.currentTeams
      .map((team, index) => {
        const teamHeader = `⭐ Team ${index + 1} ⭐`;
        const members = team.map((name) => `- ${name}`).join("\n");
        return `${teamHeader}\n${members}`;
      })
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(formattedTeams);
      const icon = this.copyButton.querySelector(".material-icons");
      icon.textContent = "check";
      this.copyButton.title = "Copied!";
      setTimeout(() => {
        icon.textContent = "content_copy";
        this.copyButton.title = "Copy Teams";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
}
