import { AccessProxy, formatNullable, notnull, type Nullable } from "pragmatism/core";
import type { $616 } from "./616";
import { difficulties } from "../constants";

export interface ChartExtraData {
  notes: number;
  constant: number;
}

export interface PatchedChart extends $616.Difficulty, ChartExtraData {}

export interface SongExtraData {
  alias: string[];
  jackets: string[];
}

export interface PatchedSong extends $616.Song, SongExtraData {
  difficulties: PatchedChart[];
}

export interface PatchedSongList extends $616.SongList {
  version: string;
  songs: PatchedSong[];
}

export class Chart extends AccessProxy<PatchedChart> {
  song: Song;
  constructor(chart: PatchedChart, song: Song) {
    super(chart);
    this.song = song;
  }

  get id() {
    return `${this.song.id}@${this.difficulty}`;
  }

  get shortId() {
    return `${this.song.idx}-${this.ratingClass}`;
  }

  get difficulty() {
    return difficulties[this.ratingClass]!;
  }

  get title() {
    return (this.title_localized ?? this.song.title_localized)?.en ?? "";
  }

  get level() {
    return `${this.rating}${formatNullable(this.ratingPlus && "+")}`;
  }
}

export class Song extends AccessProxy<PatchedSong> {
  charts = this.difficulties.map((chart) => new Chart(chart, this));
  #pack: Nullable<Pack>;
  constructor(song: PatchedSong, pack?: Nullable<Pack>) {
    super(song);
    this.#pack = pack;
  }
  get pack() {
    return notnull(this.#pack);
  }
}

export interface PatchedPack extends $616.Pack {}

export class Pack extends AccessProxy<PatchedPack> {
  get canGetFree() {
    return !!(this.id === "base" || this.is_extend_pack || this.is_active_extend_pack);
  }
}
