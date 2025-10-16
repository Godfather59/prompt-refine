declare module "vite/client" {
  interface ImportMetaEnv {
    readonly [key: string]: string | boolean | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  export {};
}

declare module "*.css" {
  const classes: string;
  export default classes;
}
