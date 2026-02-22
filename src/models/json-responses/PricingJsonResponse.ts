export interface PricingJsonResponse {
  naslov: string;
  paketi: {
    ime: string;
    pogodnosti: { pogodnost: string; napomena: string }[];
    cijena: string;
  }[];
  dodatci: {
    naslov: string;
    stavke: { naziv: string; cijena: string }[];
  };
}
