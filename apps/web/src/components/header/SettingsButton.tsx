import React from "react";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Link } from "@/i18n/navigation";

const SettingsButton = () => {
  return (
    <Link href="settings">
      <Button size={"icon"} className="cursor-pointer" variant={"ghost"}>
        <Settings className="text-black dark:text-white size-5" />
      </Button>
    </Link>
  );
};

export default SettingsButton;
