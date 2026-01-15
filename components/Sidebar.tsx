"use client"
import { Store, LayoutDashboard, Settings, LogOut, Building2, Users, FileCheck, UserCheck } from "lucide-react";
// import imgAvatar from "figma:asset/901ee08311ad77715bb249b2f460a7602bbd72cc.png";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: "manager" | "admin";
  userName: string;
}

export function Sidebar({ currentView, onNavigate, userRole, userName }: SidebarProps) {
  const navigationSections = [
    {
      title: "Gestion",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["manager", "admin"] },
        { id: "shops", label: "Mes shops", icon: Store, roles: ["manager"] },
        { id: "organizations", label: "Mes Organisations", icon: Building2, roles: ["manager"] },
        { id: "partners", label: "Mes Partenaires", icon: Users, roles: ["manager"] },
      ],
    },
    {
      title: "Administration",
      items: [
        { id: "admin-users", label: "Gestion Utilisateurs", icon: UserCheck, roles: ["admin"] },
        { id: "admin-shops", label: "Gestion Boutiques", icon: FileCheck, roles: ["admin"] },
      ],
    },
  ];

  return (
    <div className="bg-[#1a1d29] flex flex-col h-screen w-[225px] shrink-0">
      {/* User Profile */}
      <div className="box-border px-[16px] py-[16px] border-b border-[#2a2e3f]">
        <div className="flex gap-[12px] items-center">
          <div className="relative h-[40px] w-[40px] rounded-[8px] overflow-hidden shrink-0">
            {/* <img 
              src={imgAvatar} 
              alt={userName}
              className="w-full h-full object-cover"
            /> */}
          </div>
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
        {navigationSections.map((section) => {
          const sectionItems = section.items.filter((item) =>
            item.roles.includes(userRole)
          );

          if (sectionItems.length === 0) return null;

          return (
            <div key={section.title} className="mb-[24px]">
              <p className="font-['Space_Grotesk'] text-[11px] text-[#FFBF00] uppercase tracking-wider mb-[12px]">
                {section.title}
              </p>
              <div className="flex flex-col gap-[2px]">
                {sectionItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`
                        flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px] 
                        transition-colors w-full text-left
                        ${
                          isActive
                            ? "bg-[#2a2e3f] text-white"
                            : "text-[#8f92a1] hover:bg-[#2a2e3f] hover:text-white"
                        }
                      `}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span className="font-['Space_Grotesk'] text-[13px]">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="box-border px-[16px] py-[16px] border-t border-[#2a2e3f]">
        <button
          onClick={() => onNavigate("settings")}
          className={`
            flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px] 
            transition-colors w-full text-left mb-[4px]
            ${
              currentView === "settings"
                ? "bg-[#2a2e3f] text-white"
                : "text-[#8f92a1] hover:bg-[#2a2e3f] hover:text-white"
            }
          `}
        >
          <Settings className="w-[18px] h-[18px]" />
          <span className="font-['Space_Grotesk'] text-[13px]">Paramètres</span>
        </button>
        <button className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px] text-[#8f92a1] hover:bg-[#2a2e3f] hover:text-white transition-colors w-full text-left">
          <LogOut className="w-[18px] h-[18px]" />
          <span className="font-['Space_Grotesk'] text-[13px]">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}