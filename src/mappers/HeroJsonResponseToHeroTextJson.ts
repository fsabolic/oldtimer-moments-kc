import { HeroJsonResponse } from "../models/json-responses/HeroJsonResponse";
import { HeroTextJson } from "../models/text-jsons/HeroTextJson";

export const mapHeroJsonResponseToHeroTextJson = (
  heroJsonResponse: HeroJsonResponse,
): HeroTextJson => {
  return {
    title: heroJsonResponse.naslov,
    subtitle: heroJsonResponse.podnaslov,
    navigation: {
      aboutUs: heroJsonResponse.navigacija.oNama,
      contactUs: heroJsonResponse.navigacija.kontakt,
      gallery: heroJsonResponse.navigacija.galerija,
      pricing: heroJsonResponse.navigacija.paketiIPonude,
    },
  };
};
