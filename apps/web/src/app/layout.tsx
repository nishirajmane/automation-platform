import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Marketplace — Automations & Bots',
  description:
    'Discover, publish and monetise AI-powered automations and bots on the leading SaaS marketplace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark font-sans", geist.variable)}>
      <body className={cn("min-h-screen bg-background text-foreground font-sans antialiased", inter.className)}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
