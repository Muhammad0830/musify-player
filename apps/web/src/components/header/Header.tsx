import React from "react";
import { Button } from "../ui/button";
import ThemeToggler from "./ThemeToggler";
import LanguageButton from "./LanguageButton";
import SettingsButton from "./SettingsButton";
import ProfileButton from "./profile/ProfileButton";
import LogoIcon from "../sidebar/logoIcon";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";

const Header = ({
  handleToggleSideBar,
  open,
  project_name,
}: {
  handleToggleSideBar: () => void;
  open: boolean;
  project_name: string;
}) => {
  return (
    <div className="w-full overflow-hidden h-16 relative flex justify-between items-center bg-primary-background backdrop-blur:md border-b border-b-foreground/10 px-4">
      <Button
        onClick={handleToggleSideBar}
        variant={"ghost"}
        className="px-1.5 z-10 relative py-1.5 h-auto cursor-pointer rounded-md md:flex hidden"
      >
        <div className="border-2 border-primary/60 flex aspect-square w-7 rounded-[3px]">
          <div className="h-full w-0.5 bg-primary/60 ml-1.5"></div>
        </div>
      </Button>

      <Button
        onClick={handleToggleSideBar}
        variant={"ghost"}
        className="px-1.5 z-10 relative py-1.5 h-auto cursor-pointer rounded-md md:hidden flex"
      >
        <Menu className="sm:size-6 size-5" />
      </Button>

      <div className="absolute z-1 left-0 top-0 bottom-0 right-0 flex justify-center items-center">
        <div className="md:flex hidden">
          <AnimatePresence mode="popLayout">
            {!open && (
              <motion.span
                layout="position"
                key="project_name"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="md:text-3xl text-2xl flex gap-1 items-center"
              >
                <motion.div
                  layout="position"
                  key="logo"
                  className="text-black dark:text-white md:hidden flex"
                >
                  <LogoIcon />
                </motion.div>
                <span>{project_name}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="md:hidden flex items-center gap-1 text-xl">
          <div key="logo" className="text-black dark:text-white">
            <LogoIcon isDesktop={false} />
          </div>
          <span>{project_name}</span>
        </div>
      </div>

      <div className="flex z-10 relative gap-2 items-center justify-center">
        <div className="gap-2 items-center md:flex hidden">
          <ThemeToggler />
          <LanguageButton />
          <SettingsButton />
        </div>
        <ProfileButton />
      </div>
    </div>
  );
};

export default Header;
