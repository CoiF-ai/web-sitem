import "server-only";
import type { Locale } from "@/i18n/config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = dictionaries[locale] ?? dictionaries.en;
  return load();
}
