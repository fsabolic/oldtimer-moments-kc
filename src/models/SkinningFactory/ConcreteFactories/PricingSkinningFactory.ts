import { setPricingSkinning } from "../../../global-store/SkinningStore";
import { PricingTextJson } from "../../text-jsons/PricingTextJson";
import { SectionSkinning } from "../../Skinning";
import { BaseSkinningFactory } from "../SkinningFactory";
import { PricingJsonResponse } from "../../json-responses/PricingJsonResponse";
import { mapPricingJsonResponseToPricingTextJson } from "../../../mappers/PricingJsonResponseToPricingTextJson";

export class PricingSkinningFactory extends BaseSkinningFactory<
  PricingTextJson,
  PricingJsonResponse
> {
  groupName = "paketi-i-ponude";
  apply(skinning: SectionSkinning<PricingTextJson>) {
    setPricingSkinning(skinning);
  }

  mapJsonResponseToTextJson(json: PricingJsonResponse): PricingTextJson {
    return mapPricingJsonResponseToPricingTextJson(json);
  }
}
