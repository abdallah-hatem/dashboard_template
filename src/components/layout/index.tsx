"use client";
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Footer } from "./footer";
import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
  mainContentStyle?: string;
}

export default function ClientLayout({ children, mainContentStyle }: LayoutProps) {
  const isAuthenticated = true;
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 1024) setIsSidebarCollapsed(false);
  //     else setIsSidebarCollapsed(true);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const handleSidebarToggle = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // return (<>main</>)

  return (
    <div className="flex h-screen relative">
      {isAuthenticated && !isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleSidebarToggle}
        />
      )}

      {isAuthenticated && (
        <>
          <div className="lg:hidden">
            <Sidebar />
          </div>

          <div
            className={`${!isSidebarCollapsed ? "fixed" : "hidden"
              } lg:block lg:relative h-full z-50 lg:z-auto transition-transform duration-300`}
          >
            <Sidebar />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {isAuthenticated && <Navbar />}

        <main
          className={`flex-1 overflow-y-auto ${isAuthenticated ? "p-(--main-container-px)!" : "p-0!"
            } ${mainContentStyle}`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
