"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationDropdown from "@/components/ui/notification-dropdown";
import { useAuth } from "@/contexts/auth-context";

export default function TopBar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-[#364F7A] text-primary-foreground">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/participant-dashboard" className="flex items-center">
          <span className="text-xl font-bold">منصة دِيَم</span>
          <span className="ml-1 rounded-md bg-primary-foreground/20 px-1.5 py-0.5 text-xs font-medium">
            لوحة المشارك
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <NotificationDropdown userType="participant" className="text-primary-foreground hover:bg-primary-foreground/10" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">الملف الشخصي</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium">{user?.fullName || user?.name || 'المشارك'}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || 'participant@example.com'}
                </p>
                {user?.teamName && (
                  <p className="text-xs text-muted-foreground">
                    فريق: {user.teamName}
                  </p>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/participant-dashboard">
                  <User className="ml-2 h-4 w-4" />
                  <span>الملف الشخصي</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="ml-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
