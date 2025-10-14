import { Select } from "@/views/home/widgets/knowledge/select";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Loading3 } from "@/views/home/widgets/knowledge/loading";
import { useTranslation } from "react-i18next";
import { useClipboard } from "@/utils/copy";
import { knowledgeFetchIDGet } from "@/api/v1/knowledge";
export function Card4({ selectedId }: any) {
  const { data, isLoading } = knowledgeFetchIDGet(selectedId);
  const { t } = useTranslation();
  const { copyToClipboard } = useClipboard();
  return (
    <div className="w-full min-h-[65svh] p-6 bg-muted border rounded-lg hidden md:block md:col-span-3">
      {selectedId ? (
        isLoading ? (
          <Loading3 />
        ) : (
          <div className="flex flex-col gap-1">
            {/* <pre>{JSON.stringify(store.knowledgeFetchIDData, null, 2)}</pre> */}
            <div className="space-y-0.5">
              <div className="text-2xl font-semibold select-text">
                {data?.data.data.title}
              </div>
              <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 text-sm text-muted-foreground">
                <div className="space-x-1">
                  <span className="font-medium">{t("创建于")}</span>
                  <span className="select-text">
                    {dayjs
                      .unix(data?.data.data.created_at)
                      .format("YYYY-MM-DD")}
                  </span>
                </div>
                <div className="space-x-1">
                  <span className="font-medium">{t("更新于")}</span>
                  <span className="select-text">
                    {dayjs
                      .unix(data?.data.data.updated_at)
                      .format("YYYY-MM-DD")}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="bg-foreground/50" />
            <div className="flex-0 prose prose-sm dark:prose-invert prose-zinc max-w-none my-4 select-text">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                urlTransform={(url) => url}
                components={{
                  img: ({ node, ...props }) => {
                    const action = (node as any).properties?.alt;
                    if (action === "windows") {
                      return (
                        <img
                          {...props}
                          className="w-full h-auto mx-auto rounded-lg shadow"
                          loading="lazy"
                        />
                      );
                    }
                    return (
                      <img
                        {...props}
                        className="w-1/2 h-auto mx-auto rounded-lg shadow"
                        loading="lazy"
                      />
                    );
                  },
                  button: ({ node, children, ...props }) => {
                    const action = (node as any).properties?.dataAction;
                    const url = (node as any).properties?.dataUrl;
                    if (action === "copy") {
                      return (
                        <button
                          {...props}
                          className="text-primary underline font-medium"
                          onClick={() => {
                            copyToClipboard(url);
                          }}
                        >
                          {children}
                        </button>
                      );
                    }
                    return <button {...props}>{children}</button>;
                  },
                }}
              >
                {data?.data.data.body}
              </ReactMarkdown>
            </div>
          </div>
        )
      ) : (
        <Select />
      )}
    </div>
  );
}
