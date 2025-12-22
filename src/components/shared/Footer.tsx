export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Our Mumu Don Do.{' '}
          <span className="font-semibold text-primary">v1.0</span>
        </p>
      </div>
    </footer>
  );
}
