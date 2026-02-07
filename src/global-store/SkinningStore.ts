import { createStore } from "solid-js/store";
import { SectionSkinning } from "../models/Skinning";
import { GalleryTextJson } from "../models/text-jsons/GalleryTextJson";
import { AboutTextJson } from "../models/text-jsons/AboutTextJson";
import { HeroTextJson } from "../models/text-jsons/HeroTextJson";
import { PricingTextJson } from "../models/text-jsons/PricingTextJson";
import { ContactsTextJson } from "../models/text-jsons/ContactsTextJson";
import { skinningFallback } from "../constants/SkinningFallbacks";

interface SkinningStore {
  heroSkinning: SectionSkinning<HeroTextJson>;
  aboutSkinning: SectionSkinning<AboutTextJson>;
  gallerySkinning: SectionSkinning<GalleryTextJson>;
  pricingSkinning: SectionSkinning<PricingTextJson>;
  contactsSkinning: SectionSkinning<ContactsTextJson>;
}

const [skinningStore, setSkinningStore] = createStore<SkinningStore>({
  heroSkinning: { textJson: skinningFallback.hero, imageIds: [] },
  aboutSkinning: { textJson: skinningFallback.about, imageIds: [] },
  gallerySkinning: { textJson: skinningFallback.gallery, imageIds: [] },
  pricingSkinning: { textJson: skinningFallback.pricing, imageIds: [] },
  contactsSkinning: { textJson: skinningFallback.contacts, imageIds: [] },
});

function patch<T>(key: keyof SkinningStore, data: Partial<SectionSkinning<T>>) {
  setSkinningStore(key, (prev) => ({
    ...prev,
    ...data,
    textJson: {
      ...prev.textJson,
      ...data.textJson,
    },
  }));
}

export const setHeroSkinning = (data: Partial<SectionSkinning<HeroTextJson>>) =>
  patch("heroSkinning", data);

export const setAboutSkinning = (
  data: Partial<SectionSkinning<AboutTextJson>>,
) => patch("aboutSkinning", data);

export const setGallerySkinning = (
  data: Partial<SectionSkinning<GalleryTextJson>>,
) => patch("gallerySkinning", data);

export const setPricingSkinning = (
  data: Partial<SectionSkinning<PricingTextJson>>,
) => patch("pricingSkinning", data);

export const setContactsSkinning = (
  data: Partial<SectionSkinning<ContactsTextJson>>,
) => patch("contactsSkinning", data);

export const useSkinningStore = () => skinningStore;
