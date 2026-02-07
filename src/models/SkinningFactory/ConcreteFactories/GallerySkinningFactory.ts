import { setGallerySkinning } from "../../../global-store/SkinningStore";
import { mapGalleryJsonResponseToGalleryTextJson } from "../../../mappers/GalleryJsonResponseToGalleryTextJson";
import { GalleryJsonResponse } from "../../json-responses/GalleryJsonResponse";
import { SectionSkinning } from "../../Skinning";
import { GalleryTextJson } from "../../text-jsons/GalleryTextJson";
import { BaseSkinningFactory } from "../SkinningFactory";

export class GallerySkinningFactory extends BaseSkinningFactory<
  GalleryTextJson,
  GalleryJsonResponse
> {
  groupName = "galerija";
  apply(skinning: SectionSkinning<GalleryTextJson>) {
    setGallerySkinning(skinning);
  }
  mapJsonResponseToTextJson(json: GalleryJsonResponse): GalleryTextJson {
    return mapGalleryJsonResponseToGalleryTextJson(json);
  }
}
