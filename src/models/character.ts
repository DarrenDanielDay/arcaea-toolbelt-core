import type { Nullable } from "pragmatism";
import type { CharacterImageKind, CharacterStatus } from "../constants/enums";

export interface LevelFactor {
  level: number;
  value: number;
}

export type CurvedKeyFactor = [level1: number, level20: number];

export type KeyFactor = [level1: Nullable<number>, level20: Nullable<number>, level30?: Nullable<number>];

export interface KeyFactors {
  id: number;
  frag: KeyFactor;
  step: KeyFactor;
  over: KeyFactor;
}

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
  levels: { [level: number]: Nullable<CharacterFactors> };
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
