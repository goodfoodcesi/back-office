"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Store,
  LayoutDashboard,
  Settings,
  LogOut,
  Building2,
  Users,
  FileCheck,
  UserCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type UserRole = "admin" | "shop";

interface SidebarProps {
  userRole: UserRole;
  userName: string;
}

type NavItem = {
  href: string;
  label: string;
  icon: any;
  roles: UserRole[];
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export function Sidebar({ userRole, userName }: SidebarProps) {
  const pathname = usePathname();

  const router = useRouter();

  const onLogout = async () => {
    await authClient.signOut();
    router.replace("/login");
  };

  const sections: NavSection[] = [
    {
      title: "Gestion",
      items: [
        {
          href: userRole === "admin" ? "/admin/dashboard" : "/shop",
          label: "Dashboard",
          icon: LayoutDashboard,
          roles: ["admin", "shop"],
        },
        {
          href: "/shop/shops",
          label: "Mes shops",
          icon: Store,
          roles: ["shop"],
        },
        {
          href: "/shop/organizations",
          label: "Mes Organisations",
          icon: Building2,
          roles: ["shop"],
        },
        {
          href: "/shop/partners",
          label: "Mes Partenaires",
          icon: Users,
          roles: ["shop"],
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          href: "/admin/users",
          label: "Gestion Utilisateurs",
          icon: UserCheck,
          roles: ["admin"],
        },
        {
          href: "/admin/shops",
          label: "Gestion Boutiques",
          icon: FileCheck,
          roles: ["admin"],
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/shop" || href === "/admin") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="bg-[#1a1d29] flex flex-col h-screen w-[225px] shrink-0">
      {/* User Profile */}
      <div className="box-border px-[16px] py-[16px] border-b border-[#2a2e3f]">
        <div className="flex gap-[12px] items-center">
          <div className="relative h-[40px] w-[40px] rounded-[8px] overflow-hidden shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="font-['Space_Grotesk'] font-medium text-[13px] text-white truncate">
              {userName}
            </p>
            <p className="font-['Space_Grotesk'] text-[11px] text-[#8f92a1]">
              {userRole === "admin" ? "Administrateur" : "Manager"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 box-border px-[16px] py-[20px] overflow-y-auto">
        {sections.map((section) => {
          const items = section.items.filter((i) => i.roles.includes(userRole));
          if (items.length === 0) return null;

          return (
            <div key={section.title} className="mb-[24px]">
              <p className="font-['Space_Grotesk'] text-[11px] text-[#FFBF00] uppercase tracking-wider mb-[12px]">
                {section.title}
              </p>

              <div className="flex flex-col gap-[2px]">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px]
                        transition-colors w-full text-left
                        ${
                          active
                            ? "bg-[#2a2e3f] text-white"
                            : "text-[#8f92a1] hover:bg-[#2a2e3f] hover:text-white"
                        }
                      `}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span className="font-['Space_Grotesk'] text-[13px]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="box-border px-[16px] py-[16px] border-t border-[#2a2e3f]">
        <Link
          href={userRole === "admin" ? "/admin/settings" : "/shop/settings"}
          className={`
            flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px]
            transition-colors w-full text-left mb-[4px]
            ${
              isActive(
                userRole === "admin" ? "/admin/settings" : "/shop/settings",
              )
                ? "bg-[#2a2e3f] text-white"
                : "text-[#8f92a1] hover:bg-[#2a2e3f] hover:text-white"
            }
          `}
        >
          <Settings className="w-[18px] h-[18px]" />
          <span className="font-['Space_Grotesk'] text-[13px]">Paramètres</span>
        </Link>

        <button className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px] text-[#8f92a1] hover:bg-[#2a2e3f] hover:text-white transition-colors w-full text-left">
          <LogOut className="w-[18px] h-[18px]" />
          <span
            className="font-['Space_Grotesk'] text-[13px]"
            onClick={onLogout}
          >
            Déconnexion
          </span>
        </button>
      </div>
    </aside>
  );
}
