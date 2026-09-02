import type { Education, Experience, Language } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Tecnologías Plásticas Jorial",
    role: "Full-Stack Developer",
    startDate: "2024",
    endDate: "Actualidad",
    description:
      "Responsable del desarrollo y evolución de la primera plataforma web corporativa de la empresa, así como del diseño e implementación de sistemas empresariales personalizados para distintos procesos operativos.",
    achievements: [
      "Desarrollo de aproximadamente 35 módulos funcionales bajo arquitectura MVC.",
      "Diseño e implementación de una plataforma empresarial ERP, CRM y POS a medida para inventario, ventas, clientes, cotizaciones y procesos internos.",
      "Digitalización y automatización de operaciones, con una reducción aproximada del 80% en tiempos operativos.",
      "Diseño de APIs REST escalables con aproximadamente 50 endpoints y capacidad para integrar módulos futuros.",
      "Planeación y despliegue remoto de infraestructura sobre VPS con DigitalOcean y Linux.",
      "Participación en decisiones de arquitectura y liderazgo técnico en la evolución tecnológica interna de la empresa.",
      "Disponibilidad reportada del sistema cercana al 90%.",
    ],
    technologies: ["Laravel", "React", "Angular", "MySQL", "APIs REST", "Linux", "DigitalOcean"],
  },
  {
    company: "Tecnologías Plásticas Jorial",
    role: "Estadías Profesionales",
    startDate: "2024",
    endDate: "2024",
    description:
      "Etapa profesional enfocada en mejorar la experiencia visual y operativa de módulos ERP en fase beta. Esta colaboración evolucionó posteriormente hacia la posición de Full-Stack Developer dentro de la empresa.",
    achievements: [
      "Maquetación y mejora visual de cinco módulos ERP en fase beta.",
      "Optimización de consistencia, usabilidad e interfaz en cinco procesos empresariales clave.",
      "Adaptación de las interfaces a requerimientos operativos reales del negocio.",
    ],
    technologies: [],
  },
];

export const education: Education[] = [
  {
    institution: "Universidad Tecnológica del Valle de Toluca",
    program: "Ingeniería en Desarrollo y Gestión de Software",
    period: "2024",
    credential: "Cédula profesional 14815402",
  },
  {
    institution: "Universidad Tecnológica de Tehuacán",
    program: "Técnico Superior Universitario en Desarrollo de Software Multiplataforma",
    period: "2021",
    credential: "Cédula profesional 14815427",
  },
];

export const languages: Language[] = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Intermedio - B2", reference: "Referencia TOEFL / ITP" },
];

export const professionalStrengths = [
  "Pensamiento analítico",
  "Orientación a resultados",
  "Aprendizaje continuo",
  "Comunicación profesional",
] as const;
