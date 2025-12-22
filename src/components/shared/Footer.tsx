import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-center">
        <p className="space-x-2 text-sm text-muted-foreground">
          <span>&copy; {currentYear} Our Mumu Don Do.</span>
          <span className="font-semibold text-primary">v1.0</span>
          <span className="text-border">|</span>
          <Link
            href="/about"
            className="font-semibold text-primary hover:underline"
          >
            About
          </Link>
        </p>
      </div>
    </footer>
  );
}
