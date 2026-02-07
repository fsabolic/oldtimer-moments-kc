import { AboutJsonResponse } from "../models/json-responses/AboutJsonResponse";
import { AboutTextJson } from "../models/text-jsons/AboutTextJson";

export const mapAboutJsonResponseToAboutTextJson = (
  aboutJsonResponse: AboutJsonResponse,
): AboutTextJson => {
  return {
    title: aboutJsonResponse.naslov,
    description: aboutJsonResponse.opis,
  };
};
