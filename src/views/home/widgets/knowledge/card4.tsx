import { useV2boardUserData } from "@/store/index";
import { Select } from "@/views/home/widgets/knowledge/select";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Loading3 } from "@/views/home/widgets/knowledge/loading";

export function Card4({ selectedId }: any) {
  const store = useV2boardUserData();
  return (
    <div className="w-full min-h-[65svh] p-6 bg-muted border rounded-lg hidden md:block md:col-span-3">
      {selectedId ? (
        store.knowledgeFetchIDData.data?.[selectedId] ? (
          <div className="flex flex-col gap-1">
            {/* <pre>{JSON.stringify(store.knowledgeFetchIDData, null, 2)}</pre> */}
            <div className="space-y-0.5">
              <div className="text-2xl font-semibold select-text">
                {store.knowledgeFetchIDData.data[selectedId].title}
              </div>
              <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 text-sm text-muted-foreground">
                <div className="space-x-1">
                  <span className="font-medium">创建于</span>
                  <span className="select-text">
                    {dayjs
                      .unix(
                        store.knowledgeFetchIDData.data[selectedId].created_at
                      )
                      .format("YYYY-MM-DD")}
                  </span>
                </div>
                <div className="space-x-1">
                  <span className="font-medium">更新于</span>
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
            <Separator className="bg-foreground/50" />
            <div className="flex-0 prose prose-sm dark:prose-invert prose-zinc max-w-none my-4 select-text">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {store.knowledgeFetchIDData.data[selectedId].body}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <Loading3 />
        )
      ) : (
        <Select />
      )}
    </div>
  );
}
