"use client";
import { Globe } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";

const LanguageList = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Русский",
    value: "ru",
  },
  {
    label: "O'zbekcha",
    value: "uz",
  },
];

const LanguageButton = () => {
  const pathname = usePathname();
  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer" size={"icon"} variant={"ghost"}>
            <Globe className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-md bg-primary-background border border-primary/20">
          {LanguageList.map((item, index) => {
            return (
              <Link key={index} href={pathname} locale={item.value}>
                <Button
                  variant={"ghost"}
                  className="w-full flex justify-start cursor-pointer"
                >
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageButton;
