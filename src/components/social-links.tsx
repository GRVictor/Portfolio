import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/config/site";
import type { SocialLink } from "@/types";

const icons: Record<SocialLink["type"], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export function SocialLinks({ showLabels = false }: { showLabels?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socialLinks.map((link) => {
        const Icon = icons[link.type];
        const external = link.type !== "email";

        return (
          <Button asChild key={link.type} size={showLabels ? "default" : "icon"} variant="outline">
            <a
              aria-label={showLabels ? undefined : link.label}
              href={link.href}
              rel={external ? "noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              <Icon />
              {showLabels ? link.label : <span className="sr-only">{link.label}</span>}
            </a>
          </Button>
        );
      })}
    </div>
  );
}
