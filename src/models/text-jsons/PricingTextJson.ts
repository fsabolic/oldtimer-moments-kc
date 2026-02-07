export interface PricingTextJson {
  title: string;
  packages: {
    name: string;
    benefits: string[];
    price: string;
  }[];
  extras: {
    title: string;
    items: { name: string; price: string }[];
  };
}
