import { setAboutSkinning } from "../../../global-store/SkinningStore";
import { mapAboutJsonResponseToAboutTextJson } from "../../../mappers/AboutJsonResponseToAboutTextJson";
import { AboutJsonResponse } from "../../json-responses/AboutJsonResponse";
import { SectionSkinning } from "../../Skinning";
import { AboutTextJson } from "../../text-jsons/AboutTextJson";
import { BaseSkinningFactory } from "../SkinningFactory";
import { aboutFallbackResponse } from "../../../constants/SkinningFallbackResponses";

export class AboutSkinningFactory extends BaseSkinningFactory<
  AboutTextJson,
  AboutJsonResponse
> {
  groupName = "o-nama";
  apply(skinning: SectionSkinning<AboutTextJson>) {
    setAboutSkinning(skinning);
  }
  mapJsonResponseToTextJson(json: AboutJsonResponse): AboutTextJson {
    return mapAboutJsonResponseToAboutTextJson(json);
  }
  getFallbackResponse(): AboutJsonResponse {
    return aboutFallbackResponse;
  }
}
