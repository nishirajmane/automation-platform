'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Mail,
  Workflow,
  DollarSign,
  BarChart,
  Gift,
  Landmark,
  Compass
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const sidebarLinks = [
  { name: 'Marketplace', href: '/dashboard', icon: Home },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Collaborators', href: '/dashboard/collaborators', icon: Users },
  { name: 'Checkout', href: '/dashboard/checkout', icon: ShoppingCart },
  { name: 'Emails', href: '/dashboard/emails', icon: Mail },
  { name: 'Workflows', href: '/dashboard/workflows', icon: Workflow },
  { name: 'Sales', href: '/dashboard/sales', icon: DollarSign },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { name: 'Affiliates', href: '/dashboard/affiliates', icon: Gift },
  { name: 'Payouts', href: '/dashboard/payouts', icon: Landmark },
  { name: 'Discover', href: '/dashboard/discover', icon: Compass },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('flowmart_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser(null);
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('flowmart_user');
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  if (!user) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-[#111111] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 hidden md:flex flex-col h-screen sticky top-0 shrink-0">
        <div className="p-6">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter lowercase text-white">
            flowmart
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pb-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'text-primary bg-primary/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 w-full hover:bg-white/5 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
              <Avatar className="w-8 h-8 border border-white/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start truncate">
                <span className="text-sm font-medium leading-none truncate w-36 text-left">{user.name || 'User'}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#111111] text-white border-white/10 rounded-none mb-2">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative min-w-0">
        <header className="h-16 border-b border-white/10 flex items-center px-8 bg-[#111111] sticky top-0 z-10">
          <h1 className="text-xl font-medium capitalize">
            {pathname === '/dashboard' ? 'Marketplace' : pathname.split('/').pop()?.replace('-', ' ')}
          </h1>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
