import projectsData from "@/data/projects.json";
import type { Locale } from "@/i18n/config";

export interface LocalizedText {
  en: string;
  tr: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  techStack: string[];
  description: LocalizedText;
  imagePath: string;
  liveLink: string;
}

export interface LocalizedProject {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  imagePath: string;
  liveLink: string;
}

const projects = projectsData as Project[];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getLocalizedProjects(locale: Locale): Promise<LocalizedProject[]> {
  return projects.map((project) => localize(project, locale));
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return projects.find((project) => project.id === id);
}

function localize(project: Project, locale: Locale): LocalizedProject {
  return {
    id: project.id,
    title: project.title[locale] ?? project.title.en,
    techStack: project.techStack,
    description: project.description[locale] ?? project.description.en,
    imagePath: project.imagePath,
    liveLink: project.liveLink,
  };
}
