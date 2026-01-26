"use client";
import React, { useState } from "react";
import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleToggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <div className="h-screen w-full flex">
      <SideBar open={openSideBar} />
      <div className="flex flex-col w-full flex-1">
        <Header handleToggleSideBar={handleToggleSideBar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
