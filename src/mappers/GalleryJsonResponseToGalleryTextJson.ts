import { GalleryJsonResponse } from "../models/json-responses/GalleryJsonResponse";
import { GalleryTextJson } from "../models/text-jsons/GalleryTextJson";

export const mapGalleryJsonResponseToGalleryTextJson = (
  galleryJsonResponse: GalleryJsonResponse,
): GalleryTextJson => {
  return {
    title: galleryJsonResponse.naslov,
  };
};
