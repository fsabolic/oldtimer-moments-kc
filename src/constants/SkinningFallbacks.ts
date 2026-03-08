import { GalleryTextJson } from "../models/text-jsons/GalleryTextJson";
import { AboutTextJson } from "../models/text-jsons/AboutTextJson";
import { HeroTextJson } from "../models/text-jsons/HeroTextJson";
import { PricingTextJson } from "../models/text-jsons/PricingTextJson";
import { ContactsTextJson } from "../models/text-jsons/ContactsTextJson";
import { mapHeroJsonResponseToHeroTextJson } from "../mappers/HeroJsonResponseToHeroTextJson";
import { mapAboutJsonResponseToAboutTextJson } from "../mappers/AboutJsonResponseToAboutTextJson";
import { mapGalleryJsonResponseToGalleryTextJson } from "../mappers/GalleryJsonResponseToGalleryTextJson";
import { mapPricingJsonResponseToPricingTextJson } from "../mappers/PricingJsonResponseToPricingTextJson";
import { mapContactsJsonResponseToContactsTextJson } from "../mappers/ContactsJsonResponseToContactsTextJson copy";
import {
  heroFallbackResponse,
  aboutFallbackResponse,
  galleryFallbackResponse,
  pricingFallbackResponse,
  contactsFallbackResponse,
} from "./SkinningFallbackResponses";

interface SkinningFallback {
  hero: HeroTextJson;
  about: AboutTextJson;
  gallery: GalleryTextJson;
  pricing: PricingTextJson;
  contacts: ContactsTextJson;
}

export const skinningFallback: SkinningFallback = {
  hero: mapHeroJsonResponseToHeroTextJson(heroFallbackResponse),
  about: mapAboutJsonResponseToAboutTextJson(aboutFallbackResponse),
  gallery: mapGalleryJsonResponseToGalleryTextJson(galleryFallbackResponse),
  pricing: mapPricingJsonResponseToPricingTextJson(pricingFallbackResponse),
  contacts: mapContactsJsonResponseToContactsTextJson(contactsFallbackResponse),
};
