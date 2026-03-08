import { HeroJsonResponse } from "../models/json-responses/HeroJsonResponse";
import { AboutJsonResponse } from "../models/json-responses/AboutJsonResponse";
import { GalleryJsonResponse } from "../models/json-responses/GalleryJsonResponse";
import { PricingJsonResponse } from "../models/json-responses/PricingJsonResponse";
import { ContactsJsonResponse } from "../models/json-responses/ContactsJsonResponse";

export const heroFallbackResponse: HeroJsonResponse = {
  naslov: "OLDTIMER MOMENTS",
  podnaslov: "Koprivnica",
  navigacija: {
    oNama: "Malo o nama",
    galerija: "Slike i uspomene",
    paketiIPonude: "Naša ponuda",
    kontakt: "Javite nam se",
  },
};

export const aboutFallbackResponse: AboutJsonResponse = {
  naslov: "O nama",
  opis: "Dobrodošli u svijet malog, ali nezaboravnog Fiata 500! Naša misija je unijeti dašak elegancije i šarma prošlih vremena u vaše posebne trenutke – bilo da se radi o svadbi, romantičnom fotografiranju ili filmskim i reklamnim snimanjima.<br>Naš Fiat nije samo auto – on je putovanje kroz vrijeme, s pričom koja izaziva osmijehe i nostalgiju.<br>Retro, šarmantno i uvijek fotogenično!",
};

export const galleryFallbackResponse: GalleryJsonResponse = {
  naslov: "Galerija",
};

export const pricingFallbackResponse: PricingJsonResponse = {
  naslov: "Paketi i ponude",
  paketi: [
    {
      ime: "Classic shoot",
      pogodnosti: [
        {
          pogodnost: "Dopremanje auta na lokaciju (do 30km)",
          napomena: 1,
        },
        {
          pogodnost:
            "1 sat korištenja vozila za potrebe snimanja i fotografiranja",
          napomena: 2,
        },
        {
          pogodnost:
            "Mogućnost snimanja i fotografiranja u vozilu (bez vožnje)",
        },
        {
          pogodnost: "Osnovna dekoracija",
          napomena: 3,
        },
        {
          pogodnost: "Asistencija i tehnička podrška",
        },
      ],
    },
    {
      ime: "Moments in motion",
      pogodnosti: [
        {
          pogodnost: "Dopremanje auta na lokaciju (do 50km)",
          napomena: 1,
        },
        {
          pogodnost:
            "3 sata korištenja vozila za potrebe snimanja i fotografiranja",
          napomena: 2,
        },
        {
          pogodnost: "Mogućnost snimanja i fotografiranja vozila u vožnji",
        },
        {
          pogodnost: "Osnovna dekoracija + limenke za auto <q>JUST MARRIED</q>",
          napomena: 3,
        },
        {
          pogodnost: "Asistencija i tehnička podrška",
        },
      ],
    },
    {
      ime: "Full retro experience",
      pogodnosti: [
        {
          pogodnost: "Dopremanje auta na lokaciju (do 70km)",
          napomena: 1,
        },
        {
          pogodnost: "Cjelodnevno korištenje vozila (do 8 sat korištenja)",
        },
        {
          pogodnost:
            "Osnovna dekoracija + dekoracija po dogovoru + limenke za auto <q>JUST MARRIED</q> + šampanjac za kadar",
          napomena: 3,
        },
        {
          pogodnost: "Asistencija i tehnička podrška",
        },
      ],
    },
  ],
  napomene: [
    "svaki dodatni kilometar naplaćuje se 0,70€/km, za lokacije preko 70km cijena po dogovoru",
    "svaki dodatni sat naplaćuje se 100€/h",
    "osnovna dekoracija podrazumijeva tablicu za auto <q>mr&mrs</q> ili <q>just married</q> (po želji mladenaca) i bijelu mašnu na svaki retrovizor",
  ],
  dodatci: {
    naslov: "Dodatne mogućnosti",
    stavke: [
      { naziv: "Kofer", cijena: "50€" },
      { naziv: "Košara", cijena: "30€" },
      { naziv: "Limenke", cijena: "20€" },
    ],
  },
};

export const contactsFallbackResponse: ContactsJsonResponse = {
  naslov: "Kontakti",
  kontakti: {
    email: "oldtimer.moments.koprivnica@gmail.com",
    whatsAppBroj: "3850998356002",
    instagramLink: "oldtimer.moments.koprivnica",
  },
};
