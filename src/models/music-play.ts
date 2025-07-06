import type { RatingClass } from "../constants/enums";

export interface NoteResult {
  pure: number;
  perfect: number;
  far: number;
  lost: number;
}

export interface PotentialFactors {
  score: number;
  constant: number;
}

export interface RankingFactors {
  noteResult: NoteResult;
  constant: number;
  ratingClass: RatingClass;
}
