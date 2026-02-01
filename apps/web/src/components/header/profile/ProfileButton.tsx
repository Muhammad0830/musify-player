import React from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { ChevronDown, DoorOpen, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ThemeToggleProfile from "./ThemeToggleProfile";
import LanguageSwitchModal from "./LanguageSwitchModal";

const dummyUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  imageUrl: "",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

const ProfileButton = () => {
  const t = useTranslations("header");

  const userStartNameLetter = dummyUserData.name.split(" ")[0].charAt(0);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer px-0.5 h-8.5 flex items-center border border-primary/20 rounded-full gap-1"
          variant={"ghost"}
        >
          <div className="w-7 h-7 rounded-full flex justify-center items-center border border-primary">
            {dummyUserData.imageUrl ? (
              <Image
                src={dummyUserData.imageUrl}
                alt="user-image"
                width={40}
                height={40}
              />
            ) : (
              <span className="text-primary font-bold text-lg">
                {userStartNameLetter}
              </span>
            )}
          </div>
          <div className="mr-1 text-primary">
            <ChevronDown className="size-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-col md:gap-1 gap-0.5 bg-primary-background border border-primary/20 min-w-50"
      >
        <Link href={"/profile"}>
          <Button
            variant={"ghost"}
            className="w-full flex justify-start cursor-pointer bg-transparent h-auto border border-primary/10 px-1 py-1"
          >
            <div className="w-9 h-9 rounded-full flex justify-center items-center border border-primary">
              {dummyUserData.imageUrl ? (
                <Image
                  src={dummyUserData.imageUrl}
                  alt="user-image"
                  className="w-full h-full"
                />
              ) : (
                <span className="text-primary font-bold text-lg">
                  {userStartNameLetter}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start flex-1 text-start">
              <div className="text-base font-semibold text-foreground w-full">
                {dummyUserData.name}
              </div>
              <div className="text-sm/4 text-foreground truncate w-40">
                {dummyUserData.email}
              </div>
            </div>
          </Button>
        </Link>

        <div className="md:hidden flex flex-col gap-0.5">
          <ThemeToggleProfile />
          <LanguageSwitchModal />
        </div>

        <Link href={"/settings?tab=change_theme"}>
          <Button
            variant={"ghost"}
            className="w-full flex justify-start cursor-pointer bg-transparent h-auto border border-primary/10"
          >
            <Palette />
            <span className="text-sm">{t("change theme")}</span>
          </Button>
        </Link>

        <Button
          variant={"ghost"}
          className="w-full px-2 py-2 text-start justify-start cursor-pointer text-sm bg-destructive/30 hover:bg-destructive dark:hover:bg-destructive"
        >
          <DoorOpen />
          <span>{t("logout")}</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
