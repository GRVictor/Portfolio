import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className={projects.length === 1 ? "grid gap-5" : "grid gap-5 md:grid-cols-2"}>
      {projects.map((project, index) => (
        <ProjectCard index={index} key={project.slug} project={project} />
      ))}
    </div>
  );
}
