import { fraction, Fraction } from "pragmatism/core";
import { RatingClass, Grade } from "../constants/enums";
import {
  A_SCORE,
  AA_RATIO,
  AA_SCORE,
  B_SCORE,
  C_SCORE,
  EX_PLUS_SCORE,
  EX_RATIO,
  EX_SCORE,
  RANKING_SCORE_RATIO,
  MAX_BASE_SCORE,
} from "../constants/numbers";
import type { NoteResult, PotentialFactors, RankingFactors } from "../models/music-play";

export const computeNote = (result: NoteResult): number => {
  const { pure, far, lost } = result;
  return pure + far + lost;
};

export class Score {
  value: number;
  constructor(value: number) {
    this.value = Math.max(0, Math.floor(value));
  }
  valueOf(): number {
    return this.value;
  }
  format(): string {
    const padded = this.value.toString().padStart(8, "0");
    return `${padded.slice(0, 2)}'${padded.slice(2, 5)}'${padded.slice(5, 8)}`;
  }
}

export const computeScore = (result: NoteResult): Score => {
  const { perfect, far, lost } = result;
  const note = computeNote(result);
  const value = fraction(1)
    .sub(fraction(lost).add(fraction(far, 2)).div(fraction(note)))
    .mul(fraction(MAX_BASE_SCORE))
    .add(fraction(perfect));
  return new Score(value.valueOf());
};

export const computeGrade = (score: number): Grade => {
  switch (true) {
    case score >= EX_PLUS_SCORE:
      return Grade.EXPlus;
    case score >= EX_SCORE:
      return Grade.EX;
    case score >= AA_SCORE:
      return Grade.AA;
    case score >= A_SCORE:
      return Grade.A;
    case score >= B_SCORE:
      return Grade.B;
    case score >= C_SCORE:
      return Grade.C;
    default:
      return Grade.D;
  }
};

export const computePotentialModifier = (score: Score | number): Fraction => {
  const value = score.valueOf();
  if (value >= MAX_BASE_SCORE) {
    return fraction(2);
  }
  if (value >= EX_SCORE) {
    return fraction(score.valueOf()).sub(fraction(EX_SCORE)).div(fraction(EX_RATIO)).add(fraction(1));
  }
  return fraction(score.valueOf()).sub(fraction(EX_SCORE)).div(fraction(AA_RATIO)).add(fraction(1));
};

export class Potential extends Fraction {
  override toString(): string {
    return this.valueOf().toFixed(2);
  }
  toF4() {
    return this.valueOf().toFixed(4);
  }
}

export const computePotential = ({ score, constant }: PotentialFactors): Potential => {
  const modifier = computePotentialModifier(new Score(score));
  const value = modifier.add(fraction(constant)).max(fraction(0));
  return new Potential(value.p, value.q);
};

export const computeRankingScore = ({ constant, noteResult, ratingClass }: RankingFactors): number => {
  if (![RatingClass.Future, RatingClass.Beyond, RatingClass.Eternal].includes(ratingClass)) {
    return 0;
  }
  const score = computeScore(noteResult).valueOf();
  const note = computeNote(noteResult);
  const { perfect } = noteResult;
  const perfectPoint = Math.max(0, Math.min(perfect / note - 0.9, 0.095));
  const scorePoint = 28.5 * Math.max(0, Math.min(score / MAX_BASE_SCORE - 0.99, 0.01));
  return RANKING_SCORE_RATIO * constant * (perfectPoint + scorePoint);
};

export const computeRankingLoseScore = ({ constant, noteResult, ratingClass }: RankingFactors): number => {
  if (![RatingClass.Future, RatingClass.Beyond, RatingClass.Eternal].includes(ratingClass)) {
    return 0;
  }
  const score = computeScore(noteResult).valueOf();
  const note = computeNote(noteResult);
  const { perfect } = noteResult;
  const perfectLosePoint = Math.max(0, Math.min(0.995 - perfect / note, 0.095));
  const scoreLosePoint = 28.5 * Math.max(0, Math.min(1 - score / MAX_BASE_SCORE, 0.01));
  return -RANKING_SCORE_RATIO * constant * (perfectLosePoint + scoreLosePoint);
};
