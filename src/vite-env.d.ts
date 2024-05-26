/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly COMPARUS_DEFAULT_ROUND_TIME_MS: string;
  readonly COMPARUS_DEFAULT_SCORES_FOR_WIN: string;
  readonly COMPARUS_DEFAULT_FIELD_SIZE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
