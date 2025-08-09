export const spaceToUnderscore = (str) =>
  str.toLowerCase().replace(/\s+/g, "_");

export const underscoreToSpace = (str) => str.replace(/_/g, " ");

export const getSortedSkills = (skillsObj = {}, techStack = []) => {
  return Object.entries(skillsObj || {}).sort(([keyA], [keyB]) => {
    const inTechStackA = techStack.some(
      (skill) => spaceToUnderscore(skill) === spaceToUnderscore(keyA)
    );
    const inTechStackB = techStack.some(
      (skill) => spaceToUnderscore(skill) === spaceToUnderscore(keyB)
    );

    return inTechStackA === inTechStackB ? 0 : inTechStackA ? -1 : 1;
  });
};
