import { PricingJsonResponse } from "../models/json-responses/PricingJsonResponse";
import { PricingTextJson } from "../models/text-jsons/PricingTextJson";

export const mapPricingJsonResponseToPricingTextJson = (
  pricingJsonResponse: PricingJsonResponse,
): PricingTextJson => {
  return {
    title: pricingJsonResponse.naslov,
    packages: pricingJsonResponse.paketi.map((item) => {
      return {
        name: item.ime,
        benefits: item.pogodnosti,
        price: item.cijena,
      };
    }),
    extras: {
      title: pricingJsonResponse.dodatci.naslov,
      items: pricingJsonResponse.dodatci.stavke.map((item) => {
        return {
          name: item.naziv,
          price: item.cijena,
        };
      }),
    },
  };
};
