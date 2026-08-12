import { isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Hero from "@/components/sections/hero";
import ProjectsShowcase from "@/components/projects/projects-showcase";
import AboutContact from "@/components/sections/about-contact";
import Footer from "@/components/layout/footer";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <main className="relative">
      <Hero />
      <ProjectsShowcase locale={locale} />
      <AboutContact locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
