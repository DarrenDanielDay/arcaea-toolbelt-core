import type { $616 } from "./616";
import type { CharacterData, KeyFactors } from "./character";
import type { Alias, ArcaeaToolbeltMeta, AssetsInfo, ChartExpress, mini, NumericTable } from "./data";
import type { PatchedSongList } from "./entities";

export enum DataKind {
  Alias = "alias",
  AssetsInfo = "assets-info",
  CharacterData = "character-data",
  Characters = "characters",
  ChartData = "chart-data",
  ChartExpress = "chart-express",
  Constants = "constants",
  Factors = "factors",
  Meta = "meta",
  Notes = "notes",
  PackList = "packlist",
  SongData = "song-data",
  SongList = "songlist",
  // /** TODO */
  // WorldMapEvents = "world-map-events",
  // /** TODO */
  // WorldMapLongterm = "world-map-longterm",
}

export interface DataTypeMap {
  [DataKind.Alias]: Alias[];
  [DataKind.AssetsInfo]: AssetsInfo;
  [DataKind.CharacterData]: CharacterData[];
  [DataKind.Characters]: $616.CharacterStat[];
  [DataKind.ChartData]: mini.SongData[];
  [DataKind.ChartExpress]: ChartExpress[];
  [DataKind.Constants]: NumericTable;
  [DataKind.Factors]: KeyFactors[];
  [DataKind.Meta]: ArcaeaToolbeltMeta;
  [DataKind.Notes]: NumericTable;
  [DataKind.PackList]: $616.PackList;
  [DataKind.SongData]: PatchedSongList;
  [DataKind.SongList]: $616.SongList;
}

export interface DataProvider {
  get<T extends DataKind>(kind: T): Promise<DataTypeMap[T]>;
}
