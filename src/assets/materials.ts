import { concat, format, property, variable, type FormatProperties } from "pragmatism/core";
import { BannerType, ClearType, Grade } from "../constants/enums";
import type { Banner, ItemData } from "../models";

export const materialsBase = variable("assets/img");

const bannerFormats = {
  file: (b) => (b.type === BannerType.ArcaeaOnline ? b.file : (b.file ?? `course_banner_${b.level}.png`)),
} satisfies FormatProperties<Banner>;

export const bannerCtx = format(bannerFormats);
export const bannerFile = bannerCtx`${materialsBase}/course/banner/${"file"}`;

export const unknownJacketFile = concat`${materialsBase}/song_jacket_back_colorless.png`;

export const potentialBadgeFile = concat<number>`${materialsBase}/rating_${(level) => (level >= 0 ? level : "off")}.png`;

const clearTypeFile = (clearType: ClearType) => {
  switch (clearType) {
    case ClearType.EasyClear:
      return "easy";
    case ClearType.TrackLost:
      return "fail";
    case ClearType.FullRecall:
      return "full";
    case ClearType.HardClear:
      return "hard";
    case ClearType.PureMemory:
    case ClearType.Maximum:
      return "pure";
    case ClearType.NormalClear:
    default:
      return "normal";
  }
};

export const clearTypePath = concat<ClearType>`${materialsBase}/clear_type/${clearTypeFile}.png`;

export const gradeImgFile = (grade: Grade) => grade.replace("+", "plus").toLowerCase();

export const gradeImgPath = concat<Grade>`${materialsBase}/grade/mini/${gradeImgFile}.png`;

export const itemImgPath = concat<ItemData>`${materialsBase}/${property("file")}`;
