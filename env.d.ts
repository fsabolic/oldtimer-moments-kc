interface ImportMetaEnv {
  readonly VITE_PINATA_JWT: string;
  readonly VITE_PINATA_GATEWAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
