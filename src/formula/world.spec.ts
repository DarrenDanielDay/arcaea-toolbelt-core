import { FragmentBoost, MapType, StaminaBoost, SubscriptionMultiplier } from "../constants";
import { computeBasicProgress, computePlayResult, computeProgress } from "./world";

describe("formula/world", () => {
  describe("computePlayResult", () => {
    it("should return correct play result", () => {
      const p0 = computePlayResult(0);
      expect(p0.valueOf()).toBeCloseTo(2.5);
      const p1 = computePlayResult(1);
      expect(p1.valueOf()).toBeCloseTo(4.95);
      expect(p1.floor()).toBe("4.9");
    });
  });
  describe("computeBasicProgress", () => {
    it("should return progress with character `step`", () => {
      const f1 = computeBasicProgress({ step: 50, potential: 1 });
      expect(f1.valueOf()).toBeCloseTo(4.95);
      expect(f1.floor()).toBe("4.9");
      const p2 = computeBasicProgress({ step: 50, potential: 4 });
      expect(p2.valueOf()).toBeCloseTo(7.4);
      expect(p2.toString()).toBe("7.4");
      const p3 = computeBasicProgress({ step: 150, potential: 4 });
      expect(p3.valueOf()).toBeCloseTo(22.2);
      expect(p3.toString()).toBe("22.2");
    });
    it("should return progress with boost", () => {
      expect(computeProgress({ step: 150, potential: 4 }).valueOf()).toBe(22.2);
      expect(computeProgress({ step: 150, potential: 4, boost: { type: MapType.Legacy0 } }).valueOf()).toBe(22.2);
      expect(computeProgress({ step: 150, potential: 4, boost: { type: MapType.Legacy1 } }).valueOf()).toBe(22.2);
      expect(computeProgress({ step: 150, potential: 4, boost: { type: MapType.Normal } }).valueOf()).toBe(22.2);
      const p4 = computeProgress({
        step: 150,
        potential: 4,
        boost: { type: MapType.Legacy0, subscription: SubscriptionMultiplier.OneMonth },
      });
      expect(p4.valueOf()).toBeCloseTo(26.64);
      expect(p4.toString()).toBe("26.6");
      const p5 = computeProgress({
        step: 50,
        potential: 0,
        boost: { type: MapType.Legacy1, stamina: StaminaBoost.x6, fragment: FragmentBoost.$500 },
      });
      expect(p5.valueOf()).toBeCloseTo(22.5);
      expect(p5.toString()).toBe("22.5");
      const p6 = computeProgress({
        step: 150,
        potential: 4,
        boost: { type: MapType.Normal, memory: true },
      });
      expect(p6.valueOf()).toBeCloseTo(88.8);
      expect(p6.toString()).toBe("88.8");
      // Tairitsu (Tempest)
      const tempest = computeProgress({
        step: 160,
        potential: 0,
        boost: { type: MapType.Normal, subscription: SubscriptionMultiplier.ThreeMonth },
      });
      expect(tempest.valueOf()).toBeCloseTo(10.4);
      expect(tempest.toString()).toBe("10.4");
      // In-Game behavior: expect(tempest.toString()).toBe("10.3");
    });
  });
});
