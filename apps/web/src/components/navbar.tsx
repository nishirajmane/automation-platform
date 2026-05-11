'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/explore', label: 'Explore' },
  { href: '/sell', label: 'Sell' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBorderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const navBgOpacity = useTransform(scrollY, [0, 50], [0, 0.95]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-colors"
      style={{ 
        borderBottom: useTransform(navBorderOpacity, v => `1px solid rgba(255, 255, 255, ${v * 0.1})`),
        backgroundColor: useTransform(navBgOpacity, v => `rgba(10, 10, 10, ${v})`),
      }}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#C8F04D]" />
          <span className="font-serif text-xl tracking-wide text-[#FAFAFA]">FlowMart</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-white transition-colors ${
                pathname === link.href ? 'text-white' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex text-zinc-300 hover:text-white hover:bg-white/5 rounded-none border border-transparent">
            Sign in
          </Button>
          <Button className="hidden md:inline-flex bg-[#C8F04D] text-black hover:bg-[#b0d83a] rounded-none font-medium px-6">
            Get Started
          </Button>
          
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle menu" className="text-white hover:bg-white/10 rounded-none">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-[#0A0A0A] border-l border-white/10 text-white rounded-none">
                <VisuallyHidden>
                  <SheetTitle>Mobile Navigation</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col gap-6 mt-10">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-white/10">
                    <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5 rounded-none border border-zinc-800" onClick={() => setMobileOpen(false)}>
                      Sign in
                    </Button>
                    <Button className="bg-[#C8F04D] text-black hover:bg-[#b0d83a] rounded-none font-medium w-full" onClick={() => setMobileOpen(false)}>
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
