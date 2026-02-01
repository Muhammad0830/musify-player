"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true); // eslint-disable-line
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant={"ghost"}
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="cursor-pointer relative overflow-hidden"
      size={"icon"}
    >
      <motion.div
        initial={{ y: 0, rotate: 0, x: 0 }}
        animate={
          theme === "light"
            ? { y: 40, rotate: 180, x: -10 }
            : { y: 0, rotate: 0, x: 0 }
        }
      >
        <Sun className="size-5" />
      </motion.div>

      <motion.div
        initial={{ y: -40, rotate: 180, x: 0 }}
        animate={
          theme === "light"
            ? { y: 0, rotate: 0, x: 0 }
            : { y: -40, rotate: 180, x: -10 }
        }
        className="absolute"
      >
        <Moon className="size-5" />
      </motion.div>
    </Button>
  );
};

export default ThemeToggler;
