import { format, type FormatProperties, type EnumerateString, variable } from "pragmatism/core";
import type { Chart } from "../models/entities";
import { RatingClass } from "../constants";

export interface JacketQuery {
  chart: Chart;
  hd?: boolean;
  night?: boolean;
  lang?: EnumerateString<"ja">;
}

export const jacketFile = ({ chart, hd, lang, night }: JacketQuery) => {
  const suffix = hd ? ".jpg" : "_256.jpg";
  const version = chart.jacketOverride ? `${chart.ratingClass}` : "base";
  const localized = chart.title_localized && lang ? `_${lang}` : "";
  const time = chart.song.bg_daynight && night ? `_night` : "";
  const possible = ["", "1080_"].map((prefix) => `${prefix}${version}${localized}${time}${suffix}`);
  const jackets = chart.song.jackets;
  return jackets.find((jacket) => possible.includes(jacket))!;
};

export const songsBase = variable("assets/songs");

const chartFormats = {
  dir: (c) => `${c.song.remote_dl ? "dl_" : ""}${c.song.id}`,
  jacket: (c) => jacketFile({ chart: c }),
  "audio.local": (c) => `${c.audioOverride ? c.ratingClass : "base"}.ogg`,
  "audio.dl": (c) => `${c.song.id}`,
  "chart.local": (c) => `${c.ratingClass}.aff`,
  "chart.dl": (c) => `${c.song.id}_${c.ratingClass}`,
} satisfies FormatProperties<Chart>;

export const chartCtx = format(chartFormats);
export const chartAssetsDir = chartCtx`${songsBase}/${"dir"}`;
export const bundledChartFile = chartCtx`${chartAssetsDir}/${"chart.local"}`;
export const bundledAudioFile = chartCtx`${chartAssetsDir}/${"audio.local"}`;
export const chartJacket = chartCtx`${chartAssetsDir}/${"jacket"}`;

export const bundled = {
  audio: bundledAudioFile,
  chart: bundledChartFile,
  jacket: chartJacket,
};

export const dlcBase = variable("dl");
export const dlcChartFile = chartCtx`${dlcBase}/${"chart.dl"}`;
export const dlcAudioFile = chartCtx`${dlcBase}/${"audio.dl"}`;

export const dlc = {
  audio: dlcAudioFile,
  chart: dlcChartFile,
};

export const isDlcChart = (c: Chart) => !!(c.song.remote_dl || (c.version && c.ratingClass === RatingClass.Beyond));

export const chartFile = (c: Chart) => (isDlcChart(c) ? dlc.chart(c) : bundled.chart(c));
