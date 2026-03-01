export interface PricingJsonResponse {
  naslov: string;
  paketi: {
    ime: string;
    pogodnosti: { pogodnost: string; napomena?: number }[];
    cijena?: string;
  }[];
  napomene: string[];
  dodatci: {
    naslov: string;
    stavke: { naziv: string; cijena: string }[];
  };
}
