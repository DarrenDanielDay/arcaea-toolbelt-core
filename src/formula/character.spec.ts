import { inferKeyFactor, interpolateFactor, interpolateFactors, roundKeyFactor } from "./character";

describe("formula/character", () => {
  describe("inferKeyFactor", () => {
    it("should return inferred factors", () => {
      const [level1, level20] = inferKeyFactor({ level: 1, value: 50 }, { level: 2, value: 50.00676483452398 });
      expect(level1).toBe(50);
      expect(level20).toBe(61.6);
    });
  });
  describe("normalizeKeyFactor", () => {
    it("should return normalized key factor", () => {
      expect(roundKeyFactor(61.59999999999)).toBe(61.6);
    });
  });
  describe("interpolateFactor", () => {
    it("should return the factor with provided level", () => {
      expect(interpolateFactor(17, 12, 34)).toBe(33.653593818340866);
    });
  });
  describe("interpolateFactors", () => {
    it("should return all factor values between level 1 and level 20", () => {
      const factors = interpolateFactors(12, 34);
      expect(factors).toHaveLength(20);
      expect(factors.find((f) => f.level === 1)?.value).toBe(12);
      expect(factors.find((f) => f.level === 20)?.value).toBe(34);
    });
  });
});
