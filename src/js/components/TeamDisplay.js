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
  hide() {
    this.container.classList.add("hidden");
    // Reset scroll position when hiding
    setTimeout(() => {
      this.teamsContainer.scrollTop = 0;
    }, 300);
  }

  /**
   * Display teams in the container
   * @param {string[][]} teams - Array of teams
   */
  displayTeams(teams) {
    this.currentTeams = teams;
    requestAnimationFrame(() => {
      this.container.classList.remove("hidden");
      this.renderTeams();
      // Trigger entrance animation for team boxes
      setTimeout(() => {
        const teamBoxes = this.teamsContainer.querySelectorAll(".team-box");
        teamBoxes.forEach((box, index) => {
          box.style.transitionDelay = `${index * 0.05}s`;
          box.style.opacity = "1";
          box.style.transform = "translateY(0)";
        });
      }, 100);
    });
  }
  /**
   * Render teams in the container
   */
  renderTeams() {
    this.teamsContainer.innerHTML = this.currentTeams
      .map((team, index) => {
        const colorIndex = index % this.teamColors.length;
        return `
                    <div class="team-box" id="team-${
                      index + 1
                    }" style="background-color: ${this.teamColors[colorIndex]}">
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
   * Refresh teams with animation
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
      // Add animations
      icon.classList.add("spin-once");
      teamBoxes.forEach((box) => box.classList.add("refresh"));

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

        // Apply entrance animation
        setTimeout(() => {
          this.teamsContainer
            .querySelectorAll(".team-box")
            .forEach((box, index) => {
              box.style.transitionDelay = `${index * 0.03}s`;
              box.style.opacity = "1";
              box.style.transform = "translateY(0)";
            });

          // Remove animation classes after animation completes
          icon.classList.remove("spin-once");
          teamBoxes.forEach((box) => box.classList.remove("refresh"));
        }, 300);
      }, 150);
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
