function skillsMember() {
  if (!this.skills) {
    return [];
  }
  return this.skills.map(function(skill) {
    return skill.name;
  });
}