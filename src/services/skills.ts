// Various definitions and helper functions when working with skills and leader skills

// Skills
const scalingStats: string[] = [
  'ATK',
  'Current HP %',
  'DEF',
  'Level',
  'Life Share',
  'Life Share (AOE)',
  'Living Ally %',
  'MAX HP',
  'Missing HP',
  'SPD',
  'Surviving Allies',
  'Target Current HP %',
  'Target MAX HP',
  'Target SPD',
];

// Leader Skills
const leaderSkillAttributes: string[] = [
  'HP',
  'Attack Power',
  'Defense',
  'Attack Speed',
  'Critical Rate',
  'Resistance',
  'Accuracy',
  'Critical DMG',
];
const leaderSkillAreas: string[] = [
  'General',
  'Dungeon',
  'Element',
  'Arena',
  'Guild',
];

export default {
  scalingStats,
  leaderSkillAttributes,
  leaderSkillAreas,
};
