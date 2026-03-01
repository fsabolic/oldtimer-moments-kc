export interface PricingTextJson {
  title: string;
  packages: PricingPackage[];
  extras: PricingExtras;
  footnotes: string[];
}

export interface PricingPackage {
  name: string;
  benefits: string[];
  price?: string;
}

export interface PricingExtras {
  title: string;
  items: { name: string; price: string }[];
}
