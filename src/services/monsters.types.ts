export interface Monster {
  [key: string]: any;
  id: number;
  url: string;
  com2us_id: number;
  family_id: number;
  name: string;
  image_filename: string;
  element: string;
  archetype: string;
  base_stars: number;
  obtainable: boolean;
  can_awaken: boolean;
  is_awakened: boolean;
  awaken_bonus: string;
  skills: number[];
  skill_ups_to_max: 7;
  leader_skill: LeaderSkill | null;
  homunculus_skills: number[];
  base_hp: number;
  base_attack: number;
  base_defense: number;
  speed: number;
  crit_rate: number;
  crit_damage: number;
  resistance: number;
  accuracy: number;
  raw_hp: number;
  raw_attack: number;
  raw_defense: number;
  max_lvl_hp: number;
  max_lvl_attack: number;
  max_lvl_defense: number;
  awakens_from: number;
  awakens_to: number;
  awaken_mats_fire_low: number;
  awaken_mats_fire_mid: number;
  awaken_mats_fire_high: number;
  awaken_mats_water_low: number;
  awaken_mats_water_mid: number;
  awaken_mats_water_high: number;
  awaken_mats_wind_low: number;
  awaken_mats_wind_mid: number;
  awaken_mats_wind_high: number;
  awaken_mats_light_low: number;
  awaken_mats_light_mid: number;
  awaken_mats_light_high: number;
  awaken_mats_dark_low: number;
  awaken_mats_dark_mid: number;
  awaken_mats_dark_high: number;
  awaken_mats_magic_low: number;
  awaken_mats_magic_mid: number;
  awaken_mats_magic_high: number;
  source: MonsterSource[];
  fusion_food: boolean;
  guide: Guide | null;
  homunculus: boolean;
  craft_cost: number | null;
  craft_materials: MonsterCraftRequirement[];
}

export interface Skill {
  id: number;
  com2us_id: number;
  name: string;
  description: string;
  slot: number;
  cooltime: number | null;
  hits: number | null;
  passive: boolean;
  aoe: boolean;
  max_level: number;
  level_progress_description: string[];
  effects: SkillEffectDetail[];
  multiplier_formula: string;
  multiplier_formula_raw: string;
  scales_with: string[];
  icon_filename: string;
  used_on: number[];
}

export interface SkillEffectDetail {
  effect: Effect;
  aoe: boolean;
  single_target: boolean;
  self_effect: boolean;
  chance: number | null;
  on_crit: boolean;
  on_death: boolean;
  random: boolean;
  quantity: number | null;
  all: boolean;
  self_hp: boolean;
  target_hp: boolean;
  damage: boolean;
  note: string;
}

export interface Effect {
  id: number;
  url: string;
  name: string;
  is_buff: boolean;
  description: string;
  icon_filename: string;
}

export interface LeaderSkill {
  id?: number;
  url?: string;
  attribute: string;
  amount: number;
  area: string;
  element: string | null;
}

export interface MonsterSource {
  id: number;
  url: string;
  name: string;
  description: string;
  farmable_source: boolean;
}

export interface Guide {
  id: number;
  short_text: string;
  long_text: string;
  last_updated: Date;
}

export interface MonsterCraftRequirement {
  quantity: number;
  material: CraftMaterial;
}

export interface CraftMaterial {
  id: number;
  url: string;
  name: string;
  icon_filename: string;
}
