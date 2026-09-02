import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "plataforma-empresarial-erp-crm-pos",
    title: "Plataforma empresarial ERP / CRM / POS",
    shortDescription:
      "Sistema empresarial a medida para centralizar, digitalizar y automatizar procesos operativos de inventario, ventas, clientes y cotizaciones.",
    type: "Plataforma empresarial",
    year: "2024 - Actualidad",
    stack: [
      "Laravel",
      "PHP",
      "React",
      "Angular",
      "JavaScript",
      "TypeScript",
      "MySQL",
      "APIs REST",
      "Linux",
      "DigitalOcean",
      "Git",
    ],
    featured: true,
    image: "/projects/inventory.svg",
    imageAlt: "Mockup visual neutro de la plataforma empresarial ERP, CRM y POS",
    imageIsMockup: true,
    confidentialNote:
      "El proyecto es software privado. La representación visual no contiene código, credenciales, datos de clientes, endpoints internos ni información confidencial de la empresa.",
    overview:
      "Plataforma web empresarial desarrollada a medida para integrar funcionalidades ERP, CRM y POS y centralizar distintos procesos operativos de Tecnologías Plásticas Jorial.",
    problem:
      "La empresa necesitaba digitalizar y centralizar procesos relacionados con inventario, ventas, clientes, cotizaciones y otras operaciones internas que requerían una gestión más ágil y consistente.",
    solution:
      "Se diseñó e implementó una plataforma web bajo arquitectura MVC que reúne procesos empresariales en un solo sistema y permite automatizar operaciones recurrentes.",
    architecture:
      "La solución utiliza una arquitectura full-stack con base de datos MySQL y una capa de APIs REST diseñada para facilitar la integración, el crecimiento y la incorporación de nuevos módulos.",
    impact: [
      "Aproximadamente 35 módulos funcionales implementados.",
      "Aproximadamente 50 endpoints REST desarrollados.",
      "Reducción aproximada del 80% en tiempos operativos.",
      "Disponibilidad reportada del sistema cercana al 90%.",
    ],
    infrastructure:
      "La infraestructura fue planeada y desplegada remotamente sobre un VPS utilizando DigitalOcean y entornos Linux.",
    myRole:
      "Como Full-Stack Developer, participo en frontend, backend, arquitectura, APIs, bases de datos, despliegue e infraestructura, además de decisiones técnicas relacionadas con la evolución de la plataforma.",
    features: [
      "Administración de inventario",
      "Gestión de ventas",
      "Administración de clientes",
      "Gestión de cotizaciones",
      "Digitalización de procesos internos",
    ],
    technicalDecisions: [
      "Arquitectura MVC para organizar las responsabilidades de la plataforma.",
      "Capa de APIs REST preparada para integrar módulos futuros.",
      "Infraestructura remota sobre VPS con DigitalOcean y Linux.",
    ],
    liveUrl: "https://app.monsync.com.mx",
    gallery: [
      {
        src: "/projects/inventory.svg",
        alt: "Mockup visual neutro del panel de gestión empresarial",
      },
    ],
  },
  {
    slug: "metal-festival-landing-page",
    title: "Metal Festival Landing Page",
    shortDescription:
      "Landing page temática para presentar la programación, bandas y opciones de boletos de un festival ficticio de música metal.",
    type: "Landing page",
    year: "2024",
    stack: ["HTML5", "Sass", "JavaScript", "Gulp", "NPM"],
    featured: false,
    academicNote: "Proyecto personal de práctica frontend desarrollado en 2024.",
    image: "/projects/metal-festival.webp",
    imageAlt: "Página principal de la landing Metal Festival",
    overview:
      "Sitio estático creado para explorar la construcción de una landing page temática, su organización visual y un flujo de trabajo frontend basado en Sass y Gulp.",
    problem:
      "El ejercicio consistió en organizar en una sola página la información de un festival ficticio: presentación, horarios, bandas y opciones de acceso.",
    solution:
      "Se construyó una experiencia de navegación por secciones con una identidad visual inspirada en el metal, un hero con video y componentes diferenciados para programación, galería y boletos.",
    features: [
      "Hero principal con video de fondo",
      "Navegación por secciones con desplazamiento suave",
      "Header fijo y resaltado de la sección activa",
      "Programación organizada por días y escenarios",
      "Galería dinámica de 21 imágenes con vista modal",
      "Presentación visual de opciones ficticias de boletos",
    ],
    technicalDecisions: [
      "Organización modular de estilos Sass en directorios base y layout.",
      "Automatización con Gulp para compilar Sass y minificar JavaScript.",
      "Procesamiento de imágenes con Sharp para generar miniaturas y formatos AVIF y WebP.",
      "Carga diferida de imágenes dentro de la galería.",
    ],
    gallery: [
      {
        src: "/projects/metal-festival.webp",
        alt: "Vista pública de la landing page Metal Festival",
      },
    ],
    liveUrl: "https://grvictor.github.io/metal_festival/",
    repositoryUrl: "https://github.com/GRVictor/metal_festival",
  },
];

// Agrega aquí proyectos académicos únicamente cuando exista información verificada.
export const academicProjects: Project[] = [];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = [...projects.filter((project) => !project.featured), ...academicProjects];

export function getProjectBySlug(slug: string) {
  return [...projects, ...academicProjects].find((project) => project.slug === slug);
}

export const allProjects = [...projects, ...academicProjects];
