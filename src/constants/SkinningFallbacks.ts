import { GalleryTextJson } from "../models/text-jsons/GalleryTextJson";
import { AboutTextJson } from "../models/text-jsons/AboutTextJson";
import { HeroTextJson } from "../models/text-jsons/HeroTextJson";
import { PricingTextJson } from "../models/text-jsons/PricingTextJson";
import { ContactsTextJson } from "../models/text-jsons/ContactsTextJson";

interface SkinningFallback {
  hero: HeroTextJson;
  about: AboutTextJson;
  gallery: GalleryTextJson;
  pricing: PricingTextJson;
  contacts: ContactsTextJson;
}

export const skinningFallback: SkinningFallback = {
  hero: {
    title: "OLDTIMER MOMENTS123",
    subtitle: "Koprivnica123",
    navigation: {
      aboutUs: "Malo o nama123",
      gallery: "Slike i uspomene123",
      pricing: "Naša ponuda123",
      contactUs: "Javite nam se123",
    },
  },
  about: {
    title: "O nama123",
    description: `123Mi smo tim zaljubljenika u oldtimere koji žele podijeliti svoju strast s vama. 
    Naravno, tu smo i za vas da vam pomognemo u ostvarivanju vaših snova. Posebno, tu smo i za vas da vam pomognemo u ostvarivanju vaših snova.
    Ukoliko imate bilo kakvih pitanja, slobodno nas kontaktirajte. Mi smo tu za vas. Naravno, tu smo i za vas da vam pomognemo u ostvarivanju vaših snova. 
    Razlog tomu jest što mi volimo oldtimere i želimo podijeliti svoju strast s vama. Mi smo tim zaljubljenika u oldtimere koji žele podijeliti svoju strast s vama. 
    Naravno, tu smo i za vas da vam pomognemo u ostvarivanju vaših snova. Posebno, tu smo i za vas da vam pomognemo u ostvarivanju vaših snova.
    Ukoliko imate bilo kakvih pitanja, slobodno nas kontaktirajte. Mi smo tu za vas. Naravno, tu smo i za vas da vam pomognemo u ostvarivanju vaših snova. Razlog tomu jest što mi volimo oldtimere i želimo podijeliti svoju strast s vama.`,
  },
  gallery: {
    title: "123Galerija",
  },
  pricing: {
    title: "123Paketi i ponude",
    packages: [
      {
        name: "123Classic shoot",
        benefits: [
          "123Dopremanje 30km do lokacije",
          "1231 sat korištenja vozila",
          "123Bez vožnje",
          "123Osnovne dekoracije",
        ],
        price: "123120€",
      },
      {
        name: "123Moments in motion",
        benefits: [
          "123Dopremanje 50km do lokacije",
          "1233 sata korištenja vozila",
          "123Vožnja",
          "123Osnovne dekoracije + limenke",
        ],
        price: "123320€",
      },
      {
        name: "123Full retro experience",
        benefits: [
          "123Dopremanje 100km do lokacije",
          "123Cijeli dan korištenja vozila",
          "123Vožnja",
          "123Personalizirane dekoracije + limenke + šampanjac",
        ],
        price: "123600€",
      },
    ],
    extras: {
      title: "123Dodatci",
      items: [
        { name: "123Kofer", price: "12350€" },
        { name: "123Limneke", price: "12330€" },
        { name: "123Šampanjac", price: "12320€" },
        { name: "123Svaki dodatan kilometar", price: "1230,70€" },
      ],
    },
    footnotes: [
      "123Cijena ovisi o udaljenosti i trajanju",
      "123Plaćanje se vrši na dan događaja",
    ],
  },
  contacts: {
    title: "123Kontakt",
    contacts: {
      email: "123fakemail@mailinator.com",
      whatsapp: "1230912345678",
      instagram: "123https://www.instagram.com/oldtimermoments/",
    },
  },
};
