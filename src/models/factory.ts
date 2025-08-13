import { indexBy, type Nullable } from "pragmatism";
import { DataKind, type DataProvider } from "./provider";
import { Pack, Song } from "./entities";

export interface EntityFactoryOptions {
  initPack?: boolean;
}

export class EntityFactory {
  constructor(
    protected readonly provider: DataProvider,
    protected readonly options?: EntityFactoryOptions,
  ) {}

  #songs: Nullable<Song[]>;

  async getAllSongs() {
    return (this.#songs ??= await this.#getAllSongs());
  }

  async #getAllSongs() {
    const patchedslst = await this.provider.get(DataKind.SongData);
    const packs = this.options?.initPack ? await this.provider.get(DataKind.PackList) : null;
    const packIndex = indexBy(packs?.packs ?? [], (p) => p.id);
    return patchedslst.songs.map((s) => {
      return new Song(s, packIndex[s.set] ? new Pack(packIndex[s.set]) : null);
    });
  }
}
