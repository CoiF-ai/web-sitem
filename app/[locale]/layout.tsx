import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionaries";
import { LocaleProvider } from "@/context/locale-context";
import AppProviders from "@/components/providers/app-providers";
import CornerFrame from "@/components/layout/corner-frame";
import LanguagePill from "@/components/i18n/language-pill";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: {
        en: "/en",
        tr: "/tr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale: Locale = params.locale;
  const dict = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <AppProviders preloaderLabel={dict.preloader.label}>
        <CornerFrame />
        {children}
        <LanguagePill />
      </AppProviders>
    </LocaleProvider>
  );
}
