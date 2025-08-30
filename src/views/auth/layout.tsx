import { useTranslation } from "react-i18next";

import { ModeToggle } from "@/components/mode-toggle";
import { I18n } from "@/components/i18n";
import { Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div className="w-full grid min-h-svh">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/bg.jpeg"
          alt="Image"
          className="h-full w-full object-cover hidden dark:block"
        />
      </div>
      <div className="flex lg:w-1/2 items-center justify-center py-20 h-full backdrop-blur-lg lg:backdrop-blur-2xl lg:border-e">
        <header className="absolute top-0 inset-x-0 flex justify-between p-10">
          <I18n />
          <ModeToggle />
        </header>
        <Outlet />
      </div>
      <div className="hidden lg:block fixed bottom-5 end-5 text-sm uppercase text-foreground font-extrabold opacity-30 dark:opacity-50 backdrop-saturate-200 transition-all duration-200 hover:opacity-85">
        <span>Proudly written by </span>
        <a
          href="https://t.me/s/NEDEFINITA"
          className="underline underline-2 px-0.5"
        >
          UNDEFINED
        </a>
        <span>.</span>
      </div>
    </div>
  );
}
