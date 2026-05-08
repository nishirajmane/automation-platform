import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Build, Sell &amp; Deploy{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Automations
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          The marketplace for creators and businesses to discover, publish and monetise
          AI-powered bots and automations — all in one platform.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/marketplace" className={cn(buttonVariants({ size: "lg" }), "rounded-xl shadow-lg")}>
            Browse Marketplace
          </Link>
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-xl")}>
            Creator Dashboard
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mx-auto mt-24 grid max-w-5xl gap-8 sm:grid-cols-3">
        {[
          {
            title: 'Publish',
            desc: 'Package your AI automations with pricing, docs and versioning.',
            icon: '🚀',
          },
          {
            title: 'Discover',
            desc: 'Browse a curated marketplace of production-ready bots and workflows.',
            icon: '🔍',
          },
          {
            title: 'Deploy',
            desc: 'One-click deploy automations to your own infrastructure.',
            icon: '⚡',
          },
        ].map((f) => (
          <Card key={f.title} className="text-left transition hover:shadow-md border-border dark:border-border">
            <CardHeader>
              <div className="mb-4 text-4xl">{f.icon}</div>
              <CardTitle className="text-xl font-bold">{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-muted-foreground">
                {f.desc}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
