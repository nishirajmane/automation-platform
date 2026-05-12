'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 bg-black text-white border-b border-white/10 font-sans">
      {/* Main Left Section */}
      <div className="flex flex-1 items-center justify-between pl-6 pr-4 md:pr-8">
        {/* Logo + Github */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-3xl font-extrabold tracking-tighter lowercase text-white">
            flowmart
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 text-xs font-medium">
            <svg
              className="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span>9.1K</span>
            <Star className="h-3.5 w-3.5 fill-white" />
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link href="/discover" className="hover:text-zinc-300 transition-colors">Discover</Link>
          <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
          <Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
          <Link href="/features" className="hover:text-zinc-300 transition-colors">Features</Link>
          <Link href="/" className="rounded-full bg-white px-4 py-1.5 text-black hover:bg-zinc-200 transition-colors">About</Link>
          <Link href="/jobs" className="hover:text-zinc-300 transition-colors">Jobs</Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger 
              render={
                <Button variant="ghost" size="icon" aria-label="Toggle menu" className="text-white hover:bg-white/10 rounded-none" />
              }
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-[#0A0A0A] border-l border-white/10 text-white rounded-none">
              <VisuallyHidden>
                <SheetTitle>Mobile Navigation</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/discover" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Discover</Link>
                <Link href="/blog" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Blog</Link>
                <Link href="/pricing" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Pricing</Link>
                <Link href="/features" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Features</Link>
                <Link href="/" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>About</Link>
                <Link href="/jobs" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Jobs</Link>
                <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-white/10">
                  <Link href="/login" className="flex items-center justify-center border border-white/20 py-3 text-sm font-medium hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Link>
                  <Link href="/sell" className="flex items-center justify-center bg-[#C8F04D] hover:bg-[#b0d83a] py-3 text-sm font-medium text-black transition-colors" onClick={() => setMobileOpen(false)}>
                    Start selling
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Right Section (Desktop) */}
      <div className="hidden lg:flex h-full">
        <Link 
          href="/login" 
          className="flex h-full items-center border-l border-white/20 px-8 text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Log in
        </Link>
        <Link 
          href="/sell" 
          className="flex h-full items-center bg-[#C8F04D] hover:bg-[#b0d83a] px-8 text-sm font-medium text-black transition-colors"
        >
          Start selling
        </Link>
      </div>
    </nav>
  );
}
