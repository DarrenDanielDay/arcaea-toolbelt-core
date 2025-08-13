import type { Nullable } from "pragmatism/core";
import type { BannerType, Difficulty, Side } from "../constants/enums";

export interface ArcaeaToolbeltMeta {
  version: string;
  apk: string;
  time: number;
  index: {
    file: string;
    hash: string;
  }[];
}
export interface ChartExpressInfo {
  constant: number;
}

export interface ChartExpress {
  songId: string;
  charts: Nullable<ChartExpressInfo>[];
}

/**
 * Reward items in world mode, such as material for character awakening.
 */
export interface ItemData {
  id: string;
  file: string;
  name: {
    en: string;
    zh: string;
  };
}

export interface Alias {
  id: string;
  alias: string[];
}

export interface SongAssetsInfo {
  id: string;
  covers: string[];
}

export interface CourseBanner {
  type: BannerType.Course;
  file?: string;
  level: number;
}

export interface ArcaeaOnlineBanner {
  type: BannerType.ArcaeaOnline;
  file: string;
  year: number;
  month: number;
}

export type Banner = CourseBanner | ArcaeaOnlineBanner;

export interface Rating {
  level: number;
  plus?: boolean;
}

export interface AssetsInfo {
  songs: SongAssetsInfo[];
  banners: Banner[];
  cores: string[];
}


export namespace mini {
  export type DataTable<T> = T[];
  export interface Song {
    id: string;
    side: Side;
    alias: string[];
    name: string;
    covers: string[];
    pack: string;
    dl: boolean;
    /**
     * `bpm` is not a number because bpm of some song is not a constant.
     */
    bpm: string;
    version: {
      added: string;
      deleted?: string;
    };
  }

  export interface ChartOverride {
    url?: string;
    name?: string;
    cover?: boolean;
    bpm?: string;
  }

  export interface Chart extends Rating {
    id: string;
    songId: string;
    difficulty: Difficulty;
    designer: string;
    constant: number;
    note: number;
    override?: ChartOverride;
  }

  export interface SongData extends Song {
    charts: Chart[];
  }

  export interface SongIndex {
    [songId: string]: SongData;
  }
}


export type NumericTable = mini.DataTable<Nullable<number>[]>;