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
export function Card3({ openDrawer, setOpenDrawer, selectedId }: any) {
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
                  <span className="font-medium">创建于</span>
                  <span className="select-text">2025-02-01 07:29:30</span>
                </div>
                <div className="space-x-1">
                  <span className="font-medium">更新于</span>
                  <span className="select-text">2025-02-01 07:34:14</span>
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
