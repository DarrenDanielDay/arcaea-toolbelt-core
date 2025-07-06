import type { CharacterImageKind, CharacterStatus } from "../constants/enums";

export interface LevelFactor {
  level: number;
  value: number;
}

export type CharacterKeyFactor = [
  level1: number,
  level20: number,
]

export interface CharacterFactors {
  frag: number;
  step: number;
  over: number;
}
/**
 * not real character instance
 */

export interface CharacterData {
  id: number;
  name: {
    zh: string;
    en: string;
  };
  can?: {
    awake?: boolean;
    lost?: boolean;
  };
  levels: { [level: number]: CharacterFactors | undefined | null };
}

export interface CharacterImageQuery {
  /**
   * `-1` for unknown character
   */
  id: number;
  status: CharacterStatus;
  kind: CharacterImageKind;
}

export interface CharacterInstanceData {
  id: number;
  level: number;
  exp: number;
  factors: CharacterFactors;
}