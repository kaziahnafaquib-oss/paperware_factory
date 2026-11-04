import BN from "./BN";
import AR from "./AR";
import TR from "./TR";
import ES from "./ES";
import FR from "./FR";
import DE from "./DE";
import IT from "./IT";
import PT from "./PT";
import RU from "./RU";
import ZH from "./ZH";
import JA from "./JA";
import NL from "./NL";

/** One file per picker language. Keys are site-i18n keys or legacy translations.ts keys. */
export const SITE_LANG_FILES: Record<string, Record<string, string>> = { BN, AR, TR, ES, FR, DE, IT, PT, RU, ZH, JA, NL };
