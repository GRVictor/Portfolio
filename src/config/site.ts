import type { SocialLink } from "@/types";

export const personalInfo = {
  name: "Victor Manuel García Rojas",
  brand: "Code Strokes",
  role: "Full-Stack Developer",
  secondaryRole: "Software Engineer",
  location: "Estado de México, México",
  email: "grojasvictor@gmail.com",
  github: "https://github.com/GRVictor",
  linkedin: "https://linkedin.com/in/victor-garc%C3%ADa-245150357",
  availableForOpportunities: false,
  availabilityLabel: "Disponible para nuevas oportunidades",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const siteConfig = {
  title: `${personalInfo.brand} | ${personalInfo.role}`,
  description:
    "Full-Stack Developer especializado en aplicaciones empresariales, plataformas ERP, CRM y POS, APIs REST y automatización de procesos.",
  heroStatement:
    "Desarrollo aplicaciones web y sistemas empresariales orientados a resolver procesos reales de negocio, desde la interfaz hasta la infraestructura.",
  about:
    "Soy Ingeniero en Desarrollo y Gestión de Software y trabajo como Full-Stack Developer, desarrollando soluciones web empresariales de extremo a extremo. Mi experiencia se ha centrado en sistemas ERP, CRM y POS personalizados, trabajando en frontend, backend, bases de datos, APIs, arquitectura e infraestructura. Me interesa construir software que simplifique procesos y resuelva necesidades reales de negocio, mientras continúo ampliando mis conocimientos en desarrollo web moderno y arquitectura de software.",
} as const;

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: personalInfo.github, type: "github" },
  { label: "LinkedIn", href: personalInfo.linkedin, type: "linkedin" },
  { label: "Correo", href: `mailto:${personalInfo.email}`, type: "email" },
];
