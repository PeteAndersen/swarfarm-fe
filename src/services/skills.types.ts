import { Element } from './monsters.types';

export enum ScalingStat {
  ATTACK = 'ATK',
  CURRENT_HP_PCT = 'Current HP %',
  DEFENSE = 'DEF',
  LEVEL = 'Level',
  LIFE_SHARE = 'Life Share',
  LIFE_SHARE_AOE = 'Life Share (AOE)',
  LIVING_ALLY_PCT = 'Living Ally %',
  MAX_HP = 'MAX HP',
  MISSING_HP = 'Missing HP',
  SPEED = 'SPD',
  SURVIVING_ALLIES = 'Surviving Allies',
  TARGET_CURRENT_HP_PCT = 'Target Current HP %',
  TARGET_MAX_HP = 'Target MAX HP',
  TARGET_SPD = 'Target SPD',
}

export enum LeaderSkillAttribute {
  HP = 'HP',
  ATTACK = 'Attack Power',
  DEFENSE = 'Defense',
  SPEED = 'Attack Speed',
  CRI_RATE = 'Critical Rate',
  RESISTANCE = 'Resistance',
  ACCURACY = 'Accuracy',
  CRI_DAMAGE = 'Critical DMG',
}

export enum LeaderSkillArea {
  GENERAL = 'General',
  DUNGEON = 'Dungeon',
  ELEMENT = 'Element',
  ARENA = 'Arena',
  GUILD = 'Guild',
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
  scales_with: ScalingStat[];
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
  attribute: LeaderSkillAttribute;
  amount: number;
  area: LeaderSkillArea;
  element: Element | null;
}
