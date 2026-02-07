// createSkinning.ts
import { createSignal, onMount } from "solid-js";
import { PinataSDK } from "pinata";
import { BaseSkinningFactory } from "../models/SkinningFactory/SkinningFactory";
import { HeroSkinningFactory } from "../models/SkinningFactory/ConcreteFactories/HeroSkinningFactory";
import { AboutSkinningFactory } from "../models/SkinningFactory/ConcreteFactories/AboutSkinningFactory";
import { GallerySkinningFactory } from "../models/SkinningFactory/ConcreteFactories/GallerySkinningFactory";
import { PricingSkinningFactory } from "../models/SkinningFactory/ConcreteFactories/PricingSkinningFactory";
import { ContactsSkinningFactory } from "../models/SkinningFactory/ConcreteFactories/ContactsSkinningFactory";

export const createSkinning = () => {
  const [skinningLoaded, setSkinningLoaded] = createSignal(false);

  const factories: BaseSkinningFactory<unknown, unknown>[] = [
    new HeroSkinningFactory(),
    new AboutSkinningFactory(),
    new GallerySkinningFactory(),
    new PricingSkinningFactory(),
    new ContactsSkinningFactory(),
  ];

  const loadSkinning = async () => {
    try {
      const pinata = new PinataSDK({
        pinataJwt: import.meta.env.VITE_PINATA_JWT,
        pinataGateway: import.meta.env.VITE_PINATA_GATEWAY,
      });

      const groups = await pinata.groups.public.list();

      for (const group of groups.groups) {
        const factory = factories.find((f) => f.groupName === group.name);
        if (!factory) continue;

        const skinning = await factory.buildSkinning(pinata, group.id);
        factory.apply(skinning);
      }
    } finally {
      setSkinningLoaded(true);
    }
  };

  onMount(loadSkinning);

  return {
    skinningLoaded,
  };
};
