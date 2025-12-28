import { Languages, Check } from "lucide-react";
// import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function I18n() {
  // const { i18n } = useTranslation();
  const currentLanguage = window.localStorage.getItem("i18n") || "zh-CN";

  const handleLanguage = (language: string) => {
    window.localStorage.setItem("i18n", language);
    location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguage("zh-CN")}
          disabled={currentLanguage === "zh-CN"}
          className="flex justify-between items-center"
        >
          <span>简体中文</span>
          {currentLanguage === "zh-CN" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleLanguage("en-US")}
          disabled={currentLanguage === "en-US"}
          className="flex justify-between items-center"
        >
          <span>English</span>
          {currentLanguage === "en-US" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
