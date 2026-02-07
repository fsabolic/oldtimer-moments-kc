export interface ContactsJsonResponse {
  naslov: string;
  kontakti: {
    email: string;
    whatsAppBroj: string;
    instagramLink: string;
  };
}
