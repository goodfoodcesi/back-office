"use client"
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";



export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [userRole] = useState<"manager" | "admin">("admin");
    const [currentView, setCurrentView] = useState(
      userRole === "admin" ? "admin-review" : "dashboard"
    );
    const router = useRouter()
    const pathname = usePathname()

    const handleSetCurrentView = ( view: string) => {
      
      router.push(view)
    
    }

    useEffect(() => {
      setCurrentView(pathname)
    },[])

  return(
      <div className="flex h-screen bg-[#f6f5f8] overflow-hidden">
        <Sidebar
          currentView={currentView}
          onNavigate={handleSetCurrentView}
          userRole={userRole}
          userName="Jordan BOUTROIS"
        />
         <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          {children}
        </div>
        </div>
        </div>
  )
}
