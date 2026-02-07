import { setHeroSkinning } from "../../../global-store/SkinningStore";
import { SectionSkinning } from "../../Skinning";
import { HeroTextJson } from "../../text-jsons/HeroTextJson";
import { BaseSkinningFactory } from "../SkinningFactory";
import { HeroJsonResponse } from "../../json-responses/HeroJsonResponse";
import { mapHeroJsonResponseToHeroTextJson } from "../../../mappers/HeroJsonResponseToHeroTextJson";

export class HeroSkinningFactory extends BaseSkinningFactory<
  HeroTextJson,
  HeroJsonResponse
> {
  groupName = "naslovnica";
  apply(skinning: SectionSkinning<HeroTextJson>) {
    setHeroSkinning(skinning);
  }
  mapJsonResponseToTextJson(json: HeroJsonResponse): HeroTextJson {
    return mapHeroJsonResponseToHeroTextJson(json);
  }
}
