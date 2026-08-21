"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Image,
  Settings,
  X,
  LogOut,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { adminDict } from '@/lib/admin-dict';

const navigation = [
  {
    name: 'لوحة التحكم',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'الرسائل الواردة',
    href: '/admin/messages',
    icon: Inbox,
  },
  {
    name: 'المدونة',
    href: '/admin/blog',
    icon: BookOpen,
  },
  {
    name: 'العروض',
    href: '/admin/offers',
    icon: BookOpen,
  },
  {
    name: 'مكتبة الوسائط',
    href: '/admin/media',
    icon: Image,
  },
  {
    name: 'العلامات التجارية',
    href: '/admin/brands',
    icon: LayoutDashboard,
  },
  {
    name: 'الخدمات',
    href: '/admin/services',
    icon: LayoutDashboard,
  },
  {
    name: 'آراء العملاء',
    href: '/admin/testimonials',
    icon: LayoutDashboard,
  },
];

export function DashboardSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "fixed inset-y-0 right-0 z-50 flex h-screen w-64 flex-col border-l bg-card transition-transform duration-300 lg:static lg:translate-x-0",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">ONE TIRE</span>
            <span className="text-xs text-muted-foreground">لوحة التحكم</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-sm font-medium',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4 space-y-1">
        <Link
          href="/admin/settings"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-sm font-medium',
            pathname === '/admin/settings'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <Settings className="h-4 w-4" />
          <span>الإعدادات</span>
        </Link>
        <button
          onClick={() => {
            window.location.href = '/api/auth/logout';
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
