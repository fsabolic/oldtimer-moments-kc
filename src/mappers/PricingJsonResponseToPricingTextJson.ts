import { PricingJsonResponse } from "../models/json-responses/PricingJsonResponse";
import { PricingTextJson } from "../models/text-jsons/PricingTextJson";

export const mapPricingJsonResponseToPricingTextJson = (
  pricingJsonResponse: PricingJsonResponse,
): PricingTextJson => {
  const notes: string[] = pricingJsonResponse.napomene.map(
    (note, i) => "*".repeat(i + 1) + note,
  );
  const packages = pricingJsonResponse.paketi.map((item) => {
    return {
      name: item.ime,
      benefits: item.pogodnosti.map((benefit) => {
        if (benefit.napomena) {
          return benefit.pogodnost + " " + "*".repeat(benefit.napomena);
        }
        return benefit.pogodnost;
      }),
      price: item.cijena,
    };
  });
  const extras = pricingJsonResponse.dodatci.stavke.map((item) => {
    return {
      name: item.naziv,
      price: item.cijena,
    };
  });

  return {
    title: pricingJsonResponse.naslov,
    packages,
    extras: {
      title: pricingJsonResponse.dodatci.naslov,
      items: extras,
    },
    footnotes: notes,
  };
};
