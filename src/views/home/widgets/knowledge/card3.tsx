import { useMediaQuery } from "react-responsive";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useV2boardUserData } from "@/store/index";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Loading2 } from "@/views/home/widgets/knowledge/loading";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
export function Card3({ openDrawer, setOpenDrawer, selectedId }: any) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const store = useV2boardUserData();
  return isMobile ? (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      autoFocus={openDrawer}
    >
      <DrawerContent className="h-[88svh]">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        {store.knowledgeFetchIDData.data?.[selectedId] ? (
          <div className="flex flex-col gap-1 max-w-[90svw] w-full mx-auto overflow-y-scroll no-scrollbar">
            <div className="space-y-0.5">
              <div className="text-2xl font-semibold select-text">
                {store.knowledgeFetchIDData.data[selectedId].title}
              </div>
              <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 text-sm text-muted-foreground">
                <div className="space-x-1">
                  <span className="font-medium">{t("创建于")}</span>
                  <span className="select-text">
                    {dayjs
                      .unix(
                        store.knowledgeFetchIDData.data[selectedId].created_at
                      )
                      .format("YYYY-MM-DD")}
                  </span>
                </div>
                <div className="space-x-1">
                  <span className="font-medium">{t("更新于")}</span>
                  <span className="select-text">
                    {dayjs
                      .unix(
                        store.knowledgeFetchIDData.data[selectedId].updated_at
                      )
                      .format("YYYY-MM-DD")}
                  </span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex-0 prose prose-sm dark:prose-invert prose-zinc max-w-[90svw] my-4 select-text">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {store.knowledgeFetchIDData.data[selectedId].body}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <Loading2 />
        )}
        <DrawerFooter>
          <Button className="w-full" onClick={() => setOpenDrawer(false)}>
            关闭文档
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : null;
}
