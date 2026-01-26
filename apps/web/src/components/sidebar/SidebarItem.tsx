import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";

interface ItemProp {
  label: string;
  icon: React.ReactNode;
  link: string;
}

const SidebarItem = ({
  item,
  open,
  animationDuration: duration,
}: {
  item: ItemProp;
  open: boolean;
  animationDuration: number;
}) => {
  const pathname = usePathname();

  return (
    <Link href={item.link} className="w-full flex">
      <Button
        variant={"ghost"}
        className={cn(
          "w-full flex justify-start cursor-pointer py-3! h-10 transition-all duration-300 hover:bg-primary! hover:text-white",
          open ? "gap-2 px-2.5" : "gap-0 px-3.5",
          pathname.startsWith(item.link)
            ? "bg-primary! text-white"
            : "bg-transparent",
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.div key="item-icon">{item.icon}</motion.div>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration }}
              key="item_label"
              className="capitalize text-base"
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </Link>
  );
};

export default SidebarItem;
