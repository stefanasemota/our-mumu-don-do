import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <section className="mb-12 text-center">
        <h1 className="mb-4 font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          About Our Mumu Don Do
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-foreground/80 md:text-xl">
          Understand Yesterday. Improve Today.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="prose prose-invert mx-auto max-w-none text-foreground/90 prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
        <p className="lead text-xl">
          <strong>Our Mumu Don Do</strong> is an educational web application
          designed for the young children of Nigeria. It aims to foster
          critical thinking, celebrate local Nigerian solutions, and provide a
          rich understanding of historical context through engaging,
          illustrated stories.
        </p>
        <p>
          In a world filled with information, it's more important than ever for
          the next generation to develop the skills to think critically about
          the narratives they encounter. This platform was created to provide a
          space where children can explore complex topics like history,
          governance, and identity in an accessible and engaging way.
        </p>
        <h2 className="font-headline text-3xl">Our Core Principles</h2>
        <ul>
          <li>
            <strong>Correcting False Narratives:</strong> We believe in
            presenting history with accuracy and nuance, challenging myths and
            highlighting the contributions of our own leaders and thinkers.
          </li>
          <li>
            <strong>Celebrating Nigerian Solutions:</strong> We showcase
            stories of local innovation, resilience, and problem-solving to
            inspire a new generation of creators and leaders.
          </li>
          <li>
            <strong>Fostering Critical Thinking:</strong> Our stories are
            designed not just to be consumed, but to be questioned. We
            encourage children to analyze, discuss, and form their own
            opinions.
          </li>
          <li>
            <strong>Promoting Unity &amp; Identity:</strong> By exploring the
            diverse cultures and shared history of Nigeria, we aim to build a
            stronger sense of unity and collective identity.
          </li>
        </ul>
        <p>
          Through a combination of storytelling, audio narration, and art, we
          hope to create a learning experience that is not only educational but
          also fun and memorable.
        </p>
      </section>
    </div>
  );
}
