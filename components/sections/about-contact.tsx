import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/i18n/config";
import ResumeLink from "@/components/contact/resume-link";
import ContactForm from "@/components/contact/contact-form";
import QuickEmailCapture from "@/components/contact/quick-email-capture";
import FadeInReveal from "@/components/FadeInReveal";

export default async function AboutContact({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const aboutLines = dict.about.title.split("\n");
  const contactLines = dict.contact.title.split("\n");

  return (
    <>
      <section
        id="about"
        className="relative mx-auto max-w-4xl px-6 py-24 md:px-16 md:py-40"
      >
        <FadeInReveal className="flex flex-col gap-6">
          <span className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
            {dict.about.kicker}
          </span>
          <h2 className="font-display text-4xl font-light text-mist md:text-5xl">
            {aboutLines.map((textLine, i) => (
              <span key={i} className="block">
                {textLine}
              </span>
            ))}
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-mist-dim md:text-base">
            {dict.about.body}
          </p>
          <div className="pt-2">
            <ResumeLink label={dict.about.resume} />
          </div>
        </FadeInReveal>
      </section>

      <section
        id="contact"
        className="relative mx-auto flex max-w-4xl flex-col gap-14 px-6 py-24 md:flex-row md:justify-between md:px-16 md:py-40"
      >
        <FadeInReveal className="flex flex-col gap-6">
          <span className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
            {dict.contact.kicker}
          </span>
          <h2 className="font-display text-4xl font-light text-mist md:text-5xl">
            {contactLines.map((textLine, i) => (
              <span key={i} className="block">
                {textLine}
              </span>
            ))}
          </h2>
          <QuickEmailCapture placeholder={dict.contact.emailPlaceholder} />
        </FadeInReveal>
        <FadeInReveal delay={0.15}>
          <ContactForm />
        </FadeInReveal>
      </section>
    </>
  );
}
