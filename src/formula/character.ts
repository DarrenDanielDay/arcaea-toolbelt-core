import { Fixed, solve } from "pragmatism/core";
import type { CharacterKeyFactor, LevelFactor } from "../models/character";

const LV_1 = 1;
const LV_20 = 20;
const LV_SUM = LV_20 + LV_1;
const LV_DIFF = LV_20 - LV_1;
const HALF_SUM = LV_SUM / 2;
const HALF_DIFF = LV_DIFF / 2;

const coefficients = (level: number, value: number) => {
  const d = 2 * level - LV_SUM;
  const t = LV_DIFF ** 3;
  const u = Math.sign(d) * ((Math.abs(d) - LV_DIFF) ** 3 + t);
  return [t - u, t + u, 2 * t * value] as const;
};

export const roundKeyFactor = (value: number) => Fixed.round(value, 1).valueOf();

export const inferKeyFactor = (levelA: LevelFactor, levelB: LevelFactor): CharacterKeyFactor => {
  const [f1, f2] = solve<2>([
    [...coefficients(levelA.level, levelA.value)],
    [...coefficients(levelB.level, levelB.value)],
  ]);
  return [roundKeyFactor(f1), roundKeyFactor(f2)];
};

export const interpolateFactor = (level: number, f1: number, f20: number): number =>
  (f1 + f20) / 2 +
  ((f20 - f1) * (Math.sign(level - HALF_SUM) * ((Math.abs(level - HALF_SUM) - HALF_DIFF) ** 3 + HALF_DIFF ** 3))) /
    (2 * HALF_DIFF ** 3);

export const interpolateFactors = (f1: number, f20: number): LevelFactor[] =>
  Array.from({ length: LV_20 }, (_, i) => ({
    level: i + 1,
    value: interpolateFactor(i + 1, f1, f20),
  }));
