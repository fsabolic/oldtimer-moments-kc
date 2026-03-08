interface ImportMetaEnv {
  readonly VITE_PINATA_JWT: string;
  readonly VITE_PINATA_GATEWAY: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
