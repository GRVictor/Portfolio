import { Badge } from "@/components/ui/badge";

export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="font-mono font-normal transition-transform duration-200 hover:-translate-y-0.5" variant="secondary">
      {children}
    </Badge>
  );
}
