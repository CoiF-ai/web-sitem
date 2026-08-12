import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/i18n/config";

export default async function Footer({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative flex flex-col items-center gap-2 px-6 pb-32 pt-16 text-center md:pb-40">
      <p className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
        {dict.footer.made}
      </p>
      <p className="font-body text-[11px] tracking-wide text-mist-dim/70">
        © {year} Neit-OS — {dict.footer.rights}
      </p>
    </footer>
  );
}
