'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Star, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('flowmart_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('flowmart_user');
    window.dispatchEvent(new Event('storage'));
    setUser(null);
  };

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

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
          <Link href="/dashboard" className="rounded-full bg-white px-4 py-1.5 text-black hover:bg-zinc-200 transition-colors">Marketplace</Link>
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
                <Link href="/dashboard" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Marketplace</Link>
                <Link href="/jobs" className="text-lg font-medium hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Jobs</Link>
                <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-white/10">
                  {user ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="w-10 h-10 border border-white/20">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                          <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user.name || 'User'}</span>
                          <span className="text-xs text-zinc-400">{user.email}</span>
                        </div>
                      </div>
                      <Link href="/dashboard" className="flex items-center justify-center bg-[#C8F04D] hover:bg-[#b0d83a] py-3 text-sm font-medium text-black transition-colors" onClick={() => setMobileOpen(false)}>
                        Dashboard
                      </Link>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors px-2 mt-2">
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link href="/login" className="flex items-center justify-center border border-white/20 py-3 text-sm font-medium hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                        Log in
                      </Link>
                      <Link href="/signup" className="flex items-center justify-center bg-[#C8F04D] hover:bg-[#b0d83a] py-3 text-sm font-medium text-black transition-colors" onClick={() => setMobileOpen(false)}>
                        Start selling
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Right Section (Desktop) */}
      <div className="hidden lg:flex h-full">
        {user ? (
          <>
            <div className="flex h-full items-center border-l border-white/20 px-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#C8F04D] focus:ring-offset-2 focus:ring-offset-black">
                  <Avatar className="w-9 h-9 border border-white/20 hover:border-white/40 transition-colors">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#111111] text-white border-white/10 rounded-none">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                        <p className="text-xs leading-none text-zinc-400">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer rounded-none">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer rounded-none">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer rounded-none flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link 
              href="/dashboard" 
              className="flex h-full items-center bg-[#C8F04D] hover:bg-[#b0d83a] px-8 text-sm font-medium text-black transition-colors"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link 
              href="/login" 
              className="flex h-full items-center border-l border-white/20 px-8 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="flex h-full items-center bg-[#C8F04D] hover:bg-[#b0d83a] px-8 text-sm font-medium text-black transition-colors"
            >
              Start selling
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
