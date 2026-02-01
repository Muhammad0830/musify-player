"use client";
import { Button } from "../../ui/button";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Paintbrush2, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ThemeToggleProfile = () => {
  const t = useTranslations("header");
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      variant={"ghost"}
      className="w-full flex justify-between cursor-pointer bg-transparent h-auto border border-primary/10 px-3"
    >
      <div className="flex items-center gap-2">
        <Paintbrush2 />
        <span className="text-sm">
          {theme === "light" ? t("light") : t("dark")}
        </span>
      </div>
      <div className="relative flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={"light"}
            className="relative"
            initial={{ opacity: 0 }}
            animate={theme === "light" ? { opacity: 1 } : { opacity: 0 }}
          >
            <Sun className="size-5 text-yellow-500" />
          </motion.div>
          <motion.div
            key={"dark"}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={theme === "light" ? { opacity: 0 } : { opacity: 1 }}
          >
            <Moon fill="white" />
          </motion.div>
        </AnimatePresence>
      </div>
    </Button>
  );
};

export default ThemeToggleProfile;
