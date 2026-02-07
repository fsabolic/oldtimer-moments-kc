import { ContactsJsonResponse } from "../models/json-responses/ContactsJsonResponse";
import { ContactsTextJson } from "../models/text-jsons/ContactsTextJson";

export const mapContactsJsonResponseToContactsTextJson = (
  contactsJsonResponse: ContactsJsonResponse,
): ContactsTextJson => {
  return {
    title: contactsJsonResponse.naslov,
    contacts: {
      email: contactsJsonResponse.kontakti.email,
      whatsapp: contactsJsonResponse.kontakti.whatsAppBroj,
      instagram: contactsJsonResponse.kontakti.instagramLink,
    },
  };
};
