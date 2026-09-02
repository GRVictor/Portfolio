# Portfolio profesional de Code Strokes

Portfolio de Victor Manuel García Rojas bajo la marca Code Strokes, construido para presentar experiencia full-stack, software empresarial y proyectos técnicos mediante casos de estudio claros. El contenido profesional actual proviene de información verificada y el proyecto principal utiliza un mockup neutro para no exponer datos privados de la empresa.

## Stack del portfolio

- Next.js 16 con App Router
- React 19 y TypeScript
- Tailwind CSS 4
- Componentes y convenciones de shadcn/ui
- Iconos de Lucide
- `next-themes` para modo claro y oscuro

## Instalación

Requisitos: Node.js 20.19 o posterior y npm.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para verificar la versión de producción:

```bash
npm run lint
npm run build
npm start
```

## Estructura de contenido

La información editable está separada de los componentes de presentación:

```txt
src/
  app/                 Rutas, metadata, sitemap y robots
  components/          Componentes reutilizables y componentes UI
  config/site.ts       Identidad, enlaces, navegación y textos generales
  data/projects.ts     Proyectos y casos de estudio
  data/experience.ts   Experiencia, educación, idiomas y fortalezas
  data/stack.ts        Tecnologías
  types/index.ts       Tipos de contenido
```

## Información personal

Edita `src/config/site.ts` para cambiar nombre, rol, ubicación, correo y enlaces sociales. Define `NEXT_PUBLIC_SITE_URL` con el dominio de producción para generar correctamente URLs canónicas, sitemap y robots:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## Proyectos

Agrega objetos que cumplan el tipo `Project` en `src/data/projects.ts`. El `slug` crea automáticamente la ruta `/proyectos/[slug]`. Campos como `problem`, `architecture`, `impact`, `infrastructure`, `features`, `challenges`, `learnings` y `gallery` son opcionales y no se renderizan cuando están ausentes.

Usa `featured: true` para destacar un proyecto. Los proyectos académicos deben agregarse a `academicProjects` únicamente cuando exista información real. Guarda capturas o mockups en `public/projects/` y referencia la ruta como `/projects/archivo.webp`.

Si una imagen no corresponde al sistema real, utiliza `imageIsMockup: true` y explica su carácter representativo. No agregues código privado, credenciales, endpoints internos ni datos empresariales sensibles.

## Experiencia, educación e idiomas

Edita `src/data/experience.ts`. Las colecciones `experiences`, `education`, `languages` y `professionalStrengths` alimentan la página `/sobre-mi` y las secciones de experiencia del inicio.

## Tecnologías

Edita `src/data/stack.ts`. Las categorías disponibles están definidas mediante `TechnologyCategory` en `src/types/index.ts`.

## Tema y colores

Los tokens visuales están en `src/app/globals.css`, dentro de `:root` y `.dark`. Siguen el modelo semántico de shadcn/ui y utilizan OKLCH. Modifica estas variables en lugar de agregar colores aislados a cada componente.

## Contacto

La página `/contacto` prioriza correo, LinkedIn y GitHub. No incluye un formulario ficticio ni requiere backend; el CTA principal abre directamente el cliente de correo.

## SEO

El proyecto incluye metadata por ruta, Open Graph, Twitter Card, `sitemap.xml`, `robots.txt`, manifest, favicon SVG e imagen social generada con Next.js.

## Despliegue

La opción más directa es Vercel:

1. Sube el proyecto a un repositorio Git.
2. Importa el repositorio en Vercel.
3. Conserva la configuración predeterminada para Next.js.
4. Configura `NEXT_PUBLIC_SITE_URL` con el dominio de producción.
5. Ejecuta `npm run lint` y `npm run build` antes de publicar.

También puede desplegarse en cualquier plataforma compatible con Node.js ejecutando `npm run build` y posteriormente `npm start`.
