import type { ClearType, Grade, RatingClass } from "../constants/enums";

export interface NoteResult {
  pure: number;
  perfect: number;
  far: number;
  lost: number;
}

export interface ScoreResult {
  chartId: string;
  score: number;
  grade: Grade;
  potential: number;
}

export type PlayResult =
  | {
      type: "score";
      chartId: string;
      score: number;
      clear: ClearType | null;
      date?: number | null;
    }
  | {
      type: "note";
      chartId: string;
      result: NoteResult;
      clear: ClearType | null;
      date?: number | null;
    };

export interface PotentialFactors {
  score: number;
  constant: number;
}

export interface RankingFactors {
  perfect: number;
  note: number;
  score: number;
  constant: number;
  ratingClass: RatingClass;
}
