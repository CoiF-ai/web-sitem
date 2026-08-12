"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LocalizedProject } from "@/lib/projects";
import TechTag from "./tech-tag";
import { useCursor } from "@/context/cursor-context";
import { useLocale } from "@/context/locale-context";
import { cn } from "@/lib/utils";
import { EXHIBIT_EASE } from "@/lib/motion";

interface ProjectCardProps {
  project: LocalizedProject;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { bind } = useCursor();
  const { dict } = useLocale();
  const reversed = index % 2 === 1;

  return (
    <motion.article
      className={cn(
        "grid items-center gap-8 py-20 md:grid-cols-2 md:gap-16 md:py-32",
        reversed && "md:[&>*:first-child]:order-2"
      )}
      style={{ perspective: 1400 }}
      initial={{ opacity: 0, y: 90, rotateX: 6, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, ease: EXHIBIT_EASE }}
    >
      <a
        href={project.liveLink}
        target="_blank"
        rel="noreferrer"
        {...bind("hover")}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm"
      >
        <Image
          src={project.imagePath}
          alt={project.title}
          fill
          unoptimized
          className="object-cover opacity-90 transition-transform duration-700 ease-exhibit group-hover:scale-[1.04]"
          sizes="(min-width: 768px) 45vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
      </a>

      <div className="flex flex-col items-start gap-5">
        <span className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-3xl font-light text-mist md:text-4xl">
          {project.title}
        </h3>
        <p className="max-w-md font-body text-sm leading-relaxed text-mist-dim">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <TechTag key={tech} label={tech} />
          ))}
        </div>
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          {...bind("hover")}
          className="mt-2 font-body text-[11px] uppercase tracking-widest text-mist underline-offset-4 transition-opacity hover:opacity-70"
        >
          {dict.work.viewLive} →
        </a>
      </div>
    </motion.article>
  );
}
