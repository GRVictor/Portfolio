import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/types";

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <article className="grid gap-5 border-t py-8 first:border-t-0 first:pt-0 sm:grid-cols-[12rem_1fr]">
      <div>
        <p className="font-mono text-xs text-muted-foreground">{experience.startDate} - {experience.endDate}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{experience.role}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{experience.company}</p>
        <p className="mt-5 leading-7 text-muted-foreground">{experience.description}</p>
        {experience.achievements.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {experience.achievements.map((achievement) => (
              <li className="flex gap-3 text-sm leading-6 text-muted-foreground" key={achievement}>
                <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-foreground" />
                {achievement}
              </li>
            ))}
          </ul>
        ) : null}
        {experience.technologies.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {experience.technologies.map((technology, index) => (
              <Badge key={`${technology}-${index}`} variant="outline">{technology}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
