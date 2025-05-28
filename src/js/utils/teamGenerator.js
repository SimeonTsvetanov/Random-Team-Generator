/**
 * Utility class for generating random teams
 */
class TeamGenerator {
  /**
   * Generate random teams from a list of names
   * @param {string[]} names - Array of names
   * @param {number} teamCount - Number of teams to create
   * @returns {string[][]} Array of teams
   */
  static generateTeams(names, teamCount) {
    // Create a copy of names array to shuffle
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);

    // Calculate minimum team size
    const minTeamSize = Math.floor(shuffledNames.length / teamCount);
    const extraMembers = shuffledNames.length % teamCount;

    // Create teams array
    const teams = Array(teamCount)
      .fill()
      .map(() => []);
    let nameIndex = 0;

    // Distribute names evenly
    for (let i = 0; i < teamCount; i++) {
      const teamSize = i < extraMembers ? minTeamSize + 1 : minTeamSize;
      teams[i] = shuffledNames.slice(nameIndex, nameIndex + teamSize);
      nameIndex += teamSize;
    }

    return teams;
  }

  /**
   * Format teams for display or copying
   * @param {string[][]} teams - Array of teams
   * @returns {string} Formatted string of teams
   */
  static formatTeams(teams) {
    return teams
      .map((team, index) => `Team ${index + 1}:\n${team.join("\n")}`)
      .join("\n\n");
  }
}
