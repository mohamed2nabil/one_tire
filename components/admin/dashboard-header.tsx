"use client";

import { useEffect, useState } from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [unreadCount] = useState(0);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-6">
      <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="البحث عن الطلبات، مقالات المدونة..."
            className="w-full pr-10 pl-3 bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">الإشعارات</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">قائمة المستخدم</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 text-right">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1 text-right">
                <p>مدير النظام</p>
                <p className="text-sm text-muted-foreground font-normal">
                  admin@onetire.sa
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-right justify-start" onClick={() => window.location.href = '/admin/settings'}>
              الإعدادات العامة
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive text-right justify-start"
              onClick={() => {
                window.location.href = '/api/auth/logout';
              }}
            >
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
