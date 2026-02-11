"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Compass,
  Heart,
  Home,
  Library,
  Settings,
  TrendingUp,
  User,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { cn } from "@/lib/utils";
import LogoIcon from "./logoIcon";

const animationDuration = 0.3;

const sidebarItems = {
  main: [
    {
      label: "home",
      icon: <Home className="w-5! h-5!" />,
      link: "/home",
    },
    {
      label: "explore",
      icon: <Compass className="w-5! h-5!" />,
      link: "/explore",
    },
    {
      label: "library",
      icon: <Library className="w-5! h-5!" />,
      link: "/library",
    },
  ],
  secondary: [
    {
      label: "favourites",
      icon: <Heart className="w-5! h-5!" />,
      link: "/favourites",
    },
    {
      label: "statistics",
      icon: <TrendingUp className="w-5! h-5!" />,
      link: "/statistics",
    },
    {
      label: "settings",
      icon: <Settings className="w-5! h-5!" />,
      link: "/settings",
    },
  ],
  bottom: [
    {
      label: "profile",
      icon: <User className="w-5! h-5!" />,
      link: "/profile",
    },
  ],
};

const SideBar = ({
  open,
  project_name,
}: {
  open: boolean;
  project_name: string;
}) => {
  return (
    <div>
      <motion.div
        className="h-full md:flex hidden flex-col bg-primary-background backdrop-blur:md border-r border-r-foreground/10 overflow-hidden relative"
        initial={{ width: 70 }}
        animate={{ width: open ? 250 : 70 }}
        transition={{ duration: animationDuration }}
      >
        <div
          id="sidebar_logo"
          className="w-full h-16 gap-2 border-b border-b-foreground/10 flex justify-center items-center"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              layout="position"
              key="logo"
              className="text-black dark:text-white"
            >
              <LogoIcon />
            </motion.div>

            {open && (
              <motion.span
                layout="position"
                key="project_name"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="md:text-3xl text-2xl"
              >
                {project_name}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="p-2.5 flex flex-col gap-1">
              {sidebarItems.main.map((item, index) => {
                return (
                  <SidebarItem
                    key={index}
                    open={open}
                    item={item}
                    animationDuration={animationDuration}
                  />
                );
              })}
            </div>

            <div
              className={cn(
                "h-px bg-foreground/10 mx-auto transition-width duration-300",
                open ? "w-9/10" : "w-4/5",
              )}
            />

            <div className="p-2.5 flex flex-col gap-1">
              {sidebarItems.secondary.map((item, index) => {
                return (
                  <SidebarItem
                    key={index}
                    open={open}
                    item={item}
                    animationDuration={animationDuration}
                  />
                );
              })}
            </div>
          </div>

          <div className="p-2.5 flex flex-col gap-1">
            {sidebarItems.bottom.map((item, index) => {
              return (
                <SidebarItem
                  key={index}
                  open={open}
                  item={item}
                  animationDuration={animationDuration}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SideBar;
