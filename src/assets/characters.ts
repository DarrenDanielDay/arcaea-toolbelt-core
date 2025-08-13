import { constant, format, property, variable, type FormatProperties } from "pragmatism/core";
import type { CharacterImageQuery } from "../models";
import { CharacterImageKind, CharacterStatus, HIKARI_AND_TAIRITSU } from "../constants";

export const charBase = variable("assets/char");

const characterFormats = {
  id: property("id"),
  status: (c) => (c.id === HIKARI_AND_TAIRITSU ? CharacterStatus.Initial : c.status),
} satisfies FormatProperties<CharacterImageQuery>;

export const characterCtx = format(characterFormats);

const unknownImageKind = (kind: CharacterImageKind) => {
  switch (kind) {
    case CharacterImageKind.Icon:
      return constant("unknown_icon");
    default:
      return constant("-1_mp");
  }
};

const knownImageKind = (kind: CharacterImageKind) => {
  switch (kind) {
    case CharacterImageKind.Icon:
      return characterCtx`${charBase}/${"id"}${"status"}_icon.png`;
    default:
      return characterCtx`${charBase}/1080/${"id"}${"status"}.png`;
  }
};

export const characterImage = (image: CharacterImageQuery) => {
  if (image.id === -1) {
    return characterCtx`${charBase}/${unknownImageKind(image.kind)}.png`(image);
  }
  return knownImageKind(image.kind)(image);
};
