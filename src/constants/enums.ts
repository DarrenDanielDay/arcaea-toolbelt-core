export enum Side {
  /**
   * color: solid cyan
   */
  Light,
  /**
   * color: dark purple
   */
  Conflict,
  /**
   * color: white with pink
   */
  Colorless,
  /**
   * color: white with gray
   */
  Lephon,
}

export enum RatingClass {
  Past,
  Present,
  Future,
  Beyond,
  Eternal,
}

export enum Difficulty {
  Past = "pst",
  Present = "prs",
  Future = "ftr",
  Beyond = "byd",
  Eternal = "etr",
}

export enum Grade {
  EXPlus = "EX+",
  EX = "EX",
  AA = "AA",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export enum ClearType {
  Maximum = "Max",
  PureMemory = "PM",
  FullRecall = "FR",
  EasyClear = "EC",
  NormalClear = "NC",
  HardClear = "HC",
  TrackLost = "TL",
}

export { ClearType as ClearRank }

export enum MapType {
  Legacy0,
  Legacy1,
  Normal,
}

export enum FragmentBoost {
  $100 = 1.1,
  $250 = 1.25,
  $500 = 1.5,
}

export enum StaminaBoost {
  x2 = 2,
  x4 = 4,
  x6 = 6,
}

export enum SubscriptionMultiplier {
  OneMonth = 1.2,
  TwoMonth = 1.25,
  ThreeMonth = 1.3,
}

export enum CharacterStatus {
  Initial = "",
  Awaken = "u",
  /**
   * Special state for Tairitsu & Maya
   */
  Lost = "l",
}

export enum CharacterImageKind {
  /**
   * avatar
   */
  Icon,
  /**
   * full illumination
   */
  Full,
}

export enum BannerType {
  Course = "course",
  ArcaeaOnline = "aol",
}