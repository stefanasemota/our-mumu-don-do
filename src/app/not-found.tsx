import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Compass, Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary shadow-xl">
          <Icons.gorilla className="w-14 h-14 text-stitch-secondary" />
        </div>
        <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[11px] font-mono font-bold text-amber-300">
          404
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
        <Compass className="w-3.5 h-3.5 animate-spin" />
        <span>Lost In The Savannah</span>
      </div>

      <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-3">
        This Chapter is Still Being Written
      </h1>

      <p className="max-w-md text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8">
        Looks like you wandered off the kingdom map! The story, riddle, or ancient kingdom you were looking for doesn&apos;t exist or might have moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          asChild
          className="bg-stitch-secondary hover:bg-secondary-container text-on-secondary font-bold px-6 h-12 rounded-xl shadow-lg"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Discovery
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-outline-variant/40 hover:bg-surface-bright text-on-surface h-12 rounded-xl px-6"
        >
          <Link href="/about">
            <BookOpen className="mr-2 h-4 w-4" />
            About Our Mission
          </Link>
        </Button>
      </div>
    </div>
  );
}
