/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_URL_WEB_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
