import { useTranslation } from "react-i18next";

import { ModeToggle } from "@/components/mode-toggle";
import { I18n } from "@/components/i18n";
import { Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <div className="hidden bg-muted lg:block">
        <img
          src="/bg.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center py-12 h-full">
        <div className="absolute top-10 w-full flex justify-between lg:w-1/2">
          <div className="pl-10">
            <I18n />
          </div>
          <div className="pr-10">
            <ModeToggle />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
