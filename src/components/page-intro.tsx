interface PageIntroProps {
  path: string;
  title: string;
  description: string;
}

export function PageIntro({ path, title, description }: PageIntroProps) {
  return (
    <section className="container-shell pt-16 pb-12 sm:pt-24 sm:pb-16">
      <p className="hero-enter font-mono text-xs text-muted-foreground">{path}</p>
      <h1 className="hero-enter hero-delay-1 text-balance mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="hero-enter hero-delay-2 mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        {description}
      </p>
    </section>
  );
}
