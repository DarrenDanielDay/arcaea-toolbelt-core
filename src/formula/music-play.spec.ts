import { fraction } from "pragmatism/core";
import { RatingClass, Grade } from "../constants/enums";
import type { NoteResult, RankingFactors } from "../models";
import {
  computeScore,
  computeGrade,
  computePotentialModifier,
  computePotential,
  computeNote,
  computeRankingLoseScore,
  computeRankingScore,
  Score,
  computeRankingFactors,
} from "./music-play";

describe("formula/music-play", () => {
  describe("computeNote", () => {
    it("should return total note count", () => {
      expect(
        computeNote({
          pure: 985,
          far: 10,
          lost: 5,
          perfect: 980,
        }),
      ).toBe(1000);
    });
  });
  describe("Score", () => {
    describe("format", () => {
      it("should format 8-digit score with correct padding and separators", () => {
        const score = new Score(1234567);
        expect(score.format()).toBe("01'234'567");
      });

      it("should format 7-digit score with leading zero", () => {
        const score = new Score(2345678);
        expect(score.format()).toBe("02'345'678");
      });

      it("should format 6-digit score with two leading zeros", () => {
        const score = new Score(345678);
        expect(score.format()).toBe("00'345'678");
      });

      it("should format 0 as all zeros", () => {
        const score = new Score(0);
        expect(score.format()).toBe("00'000'000");
      });

      it("should format negative score as zero", () => {
        const score = new Score(-12345);
        expect(score.format()).toBe("00'000'000");
      });
    });
  });
  describe("computeScore", () => {
    it("should return correct integer score", () => {
      const score1 = computeScore({
        pure: 990,
        far: 5,
        lost: 5,
        perfect: 980,
      });
      expect(score1.valueOf()).toBe(9925980);
    });
    it("should return correct truncate non-integer score", () => {
      const score2 = computeScore({
        pure: 1038,
        far: 2,
        lost: 0,
        perfect: 958,
      });
      expect(score2.valueOf()).toBe(9991342);
    });
    it("should return correct pure memory score", () => {
      const score3 = computeScore({
        pure: 2221,
        far: 0,
        lost: 0,
        perfect: 2221,
      });
      expect(score3.valueOf()).toBe(10002221);
    });
  });
  describe("computeGrade", () => {
    it("should return correct grade", () => {
      expect(computeGrade(10002221)).toBe(Grade.EXPlus);
      expect(computeGrade(10001067)).toBe(Grade.EXPlus);
      expect(computeGrade(10001379)).toBe(Grade.EXPlus);
      expect(computeGrade(9996847)).toBe(Grade.EXPlus);
      expect(computeGrade(9990000)).toBe(Grade.EXPlus);
      expect(computeGrade(9889990)).toBe(Grade.EX);
      expect(computeGrade(9800000)).toBe(Grade.EX);
      expect(computeGrade(9574656)).toBe(Grade.AA);
      expect(computeGrade(9500000)).toBe(Grade.AA);
      expect(computeGrade(9456863)).toBe(Grade.A);
      expect(computeGrade(9200000)).toBe(Grade.A);
      expect(computeGrade(9101618)).toBe(Grade.B);
      expect(computeGrade(8900000)).toBe(Grade.B);
      expect(computeGrade(8703296)).toBe(Grade.C);
      expect(computeGrade(8600000)).toBe(Grade.C);
      expect(computeGrade(8517169)).toBe(Grade.D);
      expect(computeGrade(0)).toBe(Grade.D);
    });
  });
  describe("computePotentialModifier", () => {
    it("should return correct modifier", () => {
      expect(computePotentialModifier(10002221)).toEqual(fraction(2));
      expect(computePotentialModifier(10001067)).toEqual(fraction(2));
      expect(computePotentialModifier(10000000)).toEqual(fraction(2));
      expect(computePotentialModifier(9900000)).toEqual(fraction(3, 2));
      expect(computePotentialModifier(9800000)).toEqual(fraction(1));
      expect(computePotentialModifier(9500000)).toEqual(fraction(0));
      expect(computePotentialModifier(9200000)).toEqual(fraction(-1));
      expect(computePotentialModifier(8900000)).toEqual(fraction(-2));
      expect(computePotentialModifier(5900000)).toEqual(fraction(-12));
    });
  });
  describe("Potential", () => {
    describe("toString", () => {
      it("should return value with 2 decimal places as string", () => {
        const p = computePotential({ score: 9980000, constant: 8.0 });
        expect(p.toString()).toBe("9.90");
      });
      it("should round correctly", () => {
        const p = computePotential({ score: 9999999, constant: 10 });
        expect(p.toString()).toBe("12.00");
      });
      it("should handle integer values", () => {
        const p = computePotential({ score: 10002221, constant: 12 });
        expect(p.toString()).toBe("14.00");
      });
    });

    describe("toF4", () => {
      it("should return value with 4 decimal places as string", () => {
        const p = computePotential({ score: 9980000, constant: 8.0 });
        expect(p.toF4()).toBe("9.9000");
      });
      it("should round correctly to 4 decimals", () => {
        const p = computePotential({ score: 9999999, constant: 10 });
        expect(p.toF4()).toBe("12.0000");
      });
      it("should handle integer values", () => {
        const p = computePotential({ score: 10002221, constant: 12 });
        expect(p.toF4()).toBe("14.0000");
      });
    });
  });
  describe("computePotential", () => {
    it("should return correct potential", () => {
      const max = computePotential({ score: 10002221, constant: 12 });
      expect(max.toString()).toBe("14.00");
      expect(max.valueOf()).toBe(14);
      expect(computePotential({ score: 9980000, constant: 8.0 }).valueOf()).toBe(9.9);
    });
  });
  describe("computeRankingFactors", () => {
    it("should return ranking factors", () => {
      const { note, perfect, score } = computeRankingFactors({ pure: 1000, far: 0, lost: 0, perfect: 990 });
      expect(note).toBe(1000);
      expect(perfect).toBe(990);
      expect(score).toBe(10000990);
    });
  });
  describe("computeRankingScore", () => {
    it("should return 0 gain score", () => {
      expect(
        computeRankingScore({
          constant: 7,
          ratingClass: RatingClass.Past,
          ...computeRankingFactors({
            far: 0,
            lost: 0,
            perfect: 1000,
            pure: 1000,
          }),
        }),
      ).toBe(0);
      expect(
        computeRankingScore({
          constant: 7,
          ratingClass: RatingClass.Future,
          ...computeRankingFactors({
            far: 1000,
            lost: 0,
            perfect: 0,
            pure: 0,
          }),
        }),
      ).toBe(0);
      expect(
        computeRankingScore({
          constant: 7,
          ratingClass: RatingClass.Future,
          ...computeRankingFactors({
            far: 0,
            lost: 10,
            perfect: 0,
            pure: 990,
          }),
        }),
      ).toBe(0);
    });
    it("should return correct ration relation", () => {
      const noteResult: NoteResult = {
        far: 2,
        lost: 0,
        perfect: 980,
        pure: 998,
      };
      const factor0: RankingFactors = {
        constant: 1,
        ratingClass: RatingClass.Future,
        ...computeRankingFactors(noteResult),
      };
      const noteResult1 = structuredClone(noteResult);
      noteResult1.far--;
      noteResult1.pure++;
      const noteResult2 = structuredClone(noteResult);
      noteResult2.perfect++;

      const rs0 = computeRankingScore(factor0);
      const rs1 = computeRankingScore({ ...factor0, ...computeRankingFactors(noteResult1) });
      const rs2 = computeRankingScore({ ...factor0, ...computeRankingFactors(noteResult2) });
      expect((rs1 - rs0) / (rs2 - rs0)).toBeCloseTo(14.25, 1);
    });
  });
  describe("computeRankingLoseScore", () => {
    it("should return 0 for not involved difficulties", () => {
      const noteResult: NoteResult = {
        far: 0,
        lost: 0,
        perfect: 1000,
        pure: 1000,
      };
      expect(
        computeRankingLoseScore({
          constant: 7,
          ratingClass: RatingClass.Past,
          ...computeRankingFactors(noteResult),
        }),
      ).toBe(0);
      expect(
        computeRankingLoseScore({
          constant: 7,
          ratingClass: RatingClass.Present,
          ...computeRankingFactors(noteResult),
        }),
      ).toBe(0);
    });
    it("should return 0 ranking lose score", () => {
      expect(
        computeRankingLoseScore({
          constant: 7,
          ratingClass: RatingClass.Future,
          ...computeRankingFactors({
            far: 0,
            lost: 0,
            perfect: 1000,
            pure: 1000,
          }),
        }),
      ).toBe(-0);
      expect(
        computeRankingLoseScore({
          constant: 7,
          ratingClass: RatingClass.Future,
          ...computeRankingFactors({
            far: 0,
            lost: 0,
            perfect: 995,
            pure: 1000,
          }),
        }),
      ).toBe(-0);
      expect(
        computeRankingLoseScore({
          constant: 7,
          ratingClass: RatingClass.Future,
          ...computeRankingFactors({
            far: 0,
            lost: 0,
            perfect: 796,
            pure: 800,
          }),
        }),
      ).toBe(-0);
      expect(
        computeRankingLoseScore({
          constant: 7,
          ratingClass: RatingClass.Future,
          ...computeRankingFactors({
            far: 0,
            lost: 0,
            perfect: 796,
            pure: 801,
          }),
        }),
      ).toBeLessThan(-0);
      expect(
        computeRankingLoseScore({
          constant: 7,
          ratingClass: RatingClass.Future,
          ...computeRankingFactors({
            far: 0,
            lost: 0,
            perfect: 797,
            pure: 801,
          }),
        }),
      ).toBe(-0);
    });
    it("should return correct ratio relation", () => {
      const noteResult = {
        far: 2,
        lost: 0,
        perfect: 980,
        pure: 998,
      };
      const factor0: RankingFactors = {
        constant: 1,
        ratingClass: RatingClass.Future,
        ...computeRankingFactors(noteResult),
      };
      const noteResult1 = structuredClone(noteResult);
      noteResult1.far--;
      noteResult1.pure++;
      const noteResult2 = structuredClone(noteResult);
      noteResult2.perfect++;

      const ls0 = computeRankingScore(factor0);
      const ls1 = computeRankingScore({ ...factor0, ...computeRankingFactors(noteResult1) });
      const ls2 = computeRankingScore({ ...factor0, ...computeRankingFactors(noteResult2) });
      expect((ls1 - ls0) / (ls2 - ls0)).toBeCloseTo(14.25, 1);
    });
  });
});
