/// <reference types="vite/client" />

/** Build-time flag: include admin/portal/login UI (default false). See vite.config.ts. */
declare const __PORTALS_ENABLED__: boolean;

declare module 'figma:asset/*' {
    const content: string;
    export default content;
}
