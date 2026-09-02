import Link from "next/link";

import { SocialLinks } from "@/components/social-links";
import { personalInfo } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link className="text-sm font-semibold" href="/">
            {personalInfo.brand}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Diseñado y desarrollado con React.
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
