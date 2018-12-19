import { schema } from 'normalizr';

const craftMaterial = new schema.Entity('craftMaterials');
const source = new schema.Entity('sources');
const effect = new schema.Entity('effects');
const skill = new schema.Entity('skills', {
  effects: [{ effect }],
});

const monster = new schema.Entity('monsters', {
  skills: [skill],
  craft_materials: [{ material: craftMaterial }],
  source: [source],
});

const homunculusSkill = new schema.Entity('homunculusSkills', {
  craft_materials: [{ material: craftMaterial }],
  skill,
  prerequisites: [skill],
  used_on: [monster],
});

// Extend schemas with circular references
monster.define({
  awakens_from: monster,
  awakens_to: monster,
});

skill.define({
  used_on: [monster],
});

export default {
  monster,
  source,
  craftMaterial,
  skill,
  effect,
  homunculusSkill,
};
