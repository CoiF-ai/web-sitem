import { getLocalizedProjects } from "@/lib/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionaries";
import ProjectCard from "./project-card";

export default async function ProjectsShowcase({ locale }: { locale: Locale }) {
  const [projects, dict] = await Promise.all([
    getLocalizedProjects(locale),
    getDictionary(locale),
  ]);

  return (
    <section id="work" className="relative px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 md:mb-2">
          <span className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
            {dict.work.kicker}
          </span>
          <h2 className="font-display text-4xl font-light text-mist md:text-5xl">
            {dict.work.title}
          </h2>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
