import type { FragmentBoost, StaminaBoost, SubscriptionMultiplier, MapType } from "../constants";

export interface PlayPlusProgressBoost {
  fragment?: FragmentBoost;
  stamina?: StaminaBoost;
}

export interface NormalProgressBoost {
  memory?: boolean;
}

export interface SubscriptionProgressBoost {
  subscription?: SubscriptionMultiplier;
}

export type ProgressBoost = (
  | {
      type: MapType.Legacy0;
    }
  | ({
      type: MapType.Legacy1;
    } & PlayPlusProgressBoost)
  | ({
      type: MapType.Normal;
    } & NormalProgressBoost)
) &
  SubscriptionProgressBoost;

export interface BasicProgressFactors {
  step: number;
  potential: number;
  boost?: ProgressBoost;
}