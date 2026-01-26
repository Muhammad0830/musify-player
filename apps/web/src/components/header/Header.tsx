import React from "react";
import { Button } from "../ui/button";

const Header = ({
  handleToggleSideBar,
}: {
  handleToggleSideBar: () => void;
}) => {
  return (
    <div className="w-full h-16 bg-primary-background/30 backdrop-blur:md border-b border-b-foreground/10 flex items-center px-4">
      <Button
        onClick={handleToggleSideBar}
        variant={"outline"}
        className="px-2 py-2 h-auto cursor-pointer rounded-md"
      >
        <div className="border border-foreground/30 flex aspect-square w-6 rounded-sm">
          <div className="h-full w-px bg-foreground/30 ml-1"></div>
        </div>
      </Button>
    </div>
  );
};

export default Header;
