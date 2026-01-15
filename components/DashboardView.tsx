import { Store, CheckCircle, Clock, FileText } from "lucide-react";
import { Shop } from "./ShopCard";

interface DashboardViewProps {
  shops: Shop[];
  userRole: "manager" | "admin";
}

export function DashboardView({ shops, userRole }: DashboardViewProps) {
  const totalShops = shops.length;
  const validatedShops = shops.filter((s) => s.status === "validated").length;
  const pendingShops = shops.filter((s) => s.status === "pending").length;
  const draftShops = shops.filter((s) => s.status === "draft").length;

  const stats = [
    {
      label: "Total shops",
      value: totalShops,
      icon: Store,
      color: "#1f1f1f",
    },
    {
      label: "Validés",
      value: validatedShops,
      icon: CheckCircle,
      color: "#22c55e",
    },
    {
      label: "En attente",
      value: pendingShops,
      icon: Clock,
      color: "#FFBF00",
    },
    {
      label: "Brouillon",
      value: draftShops,
      icon: FileText,
      color: "#6b7280",
    },
  ];

  return (
    <div>
      <div className="mb-[32px]">
        <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[8px]">
          {userRole === "admin" ? "Tableau de bord Admin" : "Mon tableau de bord"}
        </h1>
        <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
          {userRole === "admin"
            ? "Vue d'ensemble de tous les shops"
            : "Gérez vos restaurants et suivez leur validation"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-[12px] p-[20px] shadow-sm"
            >
              <div className="flex items-start justify-between mb-[16px]">
                <div
                  className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-[24px] h-[24px]" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="font-['Space_Grotesk'] text-[36px] text-[#1f1f1f] mb-[4px]">
                {stat.value}
              </p>
              <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-[32px] bg-white rounded-[12px] p-[24px] shadow-sm">
        <h2 className="font-['Space_Grotesk'] text-[20px] text-[#1f1f1f] mb-[16px]">
          Activité récente
        </h2>
        {shops.length === 0 ? (
          <div className="text-center py-[40px]">
            <Store className="w-[48px] h-[48px] text-[#d1d5db] mx-auto mb-[16px]" />
            <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
              Aucun shop pour le moment
            </p>
            {userRole === "manager" && (
              <p className="font-['Space_Grotesk'] text-[14px] text-[#9ca3af] mt-[8px]">
                Créez votre premier shop pour commencer
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-[12px]">
            {shops.slice(0, 5).map((shop) => (
              <div
                key={shop.id}
                className="flex items-center gap-[16px] p-[12px] rounded-[8px] hover:bg-[#f9fafb] transition-colors"
              >
                <div className="w-[48px] h-[48px] rounded-[8px] overflow-hidden shrink-0">
                  <img
                    src={shop.imageUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] truncate">
                    {shop.name}
                  </p>
                  <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
                    {shop.category}
                  </p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div
                    className={`w-[8px] h-[8px] rounded-full ${
                      shop.status === "validated"
                        ? "bg-[#22c55e]"
                        : shop.status === "pending"
                        ? "bg-[#FFBF00]"
                        : shop.status === "refused"
                        ? "bg-[#ef4444]"
                        : "bg-[#6b7280]"
                    }`}
                  />
                  <span className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
                    {shop.status === "validated"
                      ? "Validé"
                      : shop.status === "pending"
                      ? "En attente"
                      : shop.status === "refused"
                      ? "Refusé"
                      : "Brouillon"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
