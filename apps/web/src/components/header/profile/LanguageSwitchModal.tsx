"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

const LanguageSwitchModal = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const t = useTranslations("header");
  const pathname = usePathname();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(false)}
            variant={"ghost"}
            className="w-full flex justify-start cursor-pointer bg-transparent h-auto border border-primary/10"
          >
            <Globe />
            <span className="text-sm">{t("language")}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-primary-background w-60! p-4"> 
          <DialogTitle>{t("language switch")}</DialogTitle>
          <div className="flex flex-col gap-2">
            <Link href={pathname} locale="en" className="">
              <Button variant={"outline"} className="w-full">
                English
              </Button>
            </Link>
            <Link href={pathname} locale="ru">
              <Button variant={"outline"} className="w-full">
                Русский
              </Button>
            </Link>
            <Link href={pathname} locale="uz">
              <Button variant={"outline"} className="w-full">
                O&apos;zbekcha
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguageSwitchModal;
