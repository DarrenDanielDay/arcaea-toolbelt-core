import { fixed, type Fixed } from "pragmatism/core";
import { MapType } from "../constants";
import {
  BASE_PROGRESS,
  CHARACTER_FACTOR_RATIO,
  DEFAULT_MULTIPLER,
  MEMORY_NORMAL_MULTIPLER,
  POTENTIAL_FACTOR,
} from "../constants/numbers";
import type { BasicProgressFactors } from "../models/world";

export const computePlayResult = (potential: number): Fixed => {
  return fixed(BASE_PROGRESS + POTENTIAL_FACTOR * Math.sqrt(potential), 1);
};

export const computeBasicProgress = ({ step, potential }: BasicProgressFactors): Fixed => {
  return fixed((computePlayResult(potential).valueOf() * step) / CHARACTER_FACTOR_RATIO, 1);
};

export const computeProgress = ({ step, potential, boost }: BasicProgressFactors): Fixed => {
  let progress = computeBasicProgress({ step, potential }).valueOf();
  if (boost) {
    switch (boost.type) {
      case MapType.Legacy1:
        progress *= (boost.stamina ?? DEFAULT_MULTIPLER) * (boost.fragment ?? DEFAULT_MULTIPLER);
        break;
      case MapType.Normal:
        progress *= boost.memory ? MEMORY_NORMAL_MULTIPLER : DEFAULT_MULTIPLER;
      default:
        break;
    }
    progress *= boost.subscription ?? DEFAULT_MULTIPLER;
  }
  return fixed(progress, 1);
};
