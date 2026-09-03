export type ProjectType =
  | "Plataforma empresarial"
  | "Sitio corporativo"
  | "Aplicación full-stack"
  | "Aplicación frontend"
  | "Landing page"
  | "Backend / API"
  | "Proyecto de datos"
  | "Herramienta de desarrollo"
  | "Prueba de concepto";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectVersion {
  name: string;
  status: string;
  description: string;
  stack: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  type: ProjectType;
  year: string;
  stack: string[];
  featured: boolean;
  academicNote?: string;
  confidentialNote?: string;
  imageIsMockup?: boolean;
  image: string;
  imageAlt: string;
  overview: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  impact?: string[];
  infrastructure?: string;
  myRole?: string;
  versions?: ProjectVersion[];
  features?: string[];
  technicalDecisions?: string[];
  challenges?: string[];
  learnings?: string[];
  gallery?: { src: string; alt: string }[];
  liveUrl?: string;
  repositoryUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  program: string;
  period: string;
  description?: string;
  credential?: string;
}

export type TechnologyCategory =
  | "Frontend"
  | "Backend"
  | "Bases de datos"
  | "Arquitectura y desarrollo"
  | "DevOps e infraestructura"
  | "Herramientas";

export interface Technology {
  name: string;
  category: TechnologyCategory;
}

export interface Language {
  name: string;
  level: string;
  reference?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  type: "github" | "linkedin" | "email";
}
