"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/SideBar";

const project_name = "Musify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("openSideBar");
    if (stored !== null) {
      setOpenSideBar(stored === "true"); // eslint-disable-line
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("openSideBar", openSideBar.toString());
  }, [openSideBar, mounted]);

  const handleToggleSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  if (!mounted) return null;

  return (
    <div className="h-screen w-full flex">
      <SideBar project_name={project_name} open={openSideBar ?? false} />
      <div className="flex flex-col w-full flex-1">
        <Header
          open={openSideBar ?? false}
          handleToggleSideBar={handleToggleSideBar}
          project_name={project_name}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
