import { setContactsSkinning } from "../../../global-store/SkinningStore";
import { mapContactsJsonResponseToContactsTextJson } from "../../../mappers/ContactsJsonResponseToContactsTextJson copy";
import { ContactsJsonResponse } from "../../json-responses/ContactsJsonResponse";
import { SectionSkinning } from "../../Skinning";
import { ContactsTextJson } from "../../text-jsons/ContactsTextJson";
import { BaseSkinningFactory } from "../SkinningFactory";

export class ContactsSkinningFactory extends BaseSkinningFactory<
  ContactsTextJson,
  ContactsJsonResponse
> {
  groupName = "kontakt";
  apply(skinning: SectionSkinning<ContactsTextJson>) {
    setContactsSkinning(skinning);
  }
  mapJsonResponseToTextJson(json: ContactsJsonResponse): ContactsTextJson {
    return mapContactsJsonResponseToContactsTextJson(json);
  }
}
