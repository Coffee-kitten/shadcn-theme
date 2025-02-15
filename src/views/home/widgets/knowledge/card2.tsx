import { useV2boardUserData } from "@/store/index";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { knowledgeFetchIDGet } from "@/api/knowledge";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
export function Card2() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="flex flex-col gap-6 md:gap-8 md:col-span-1">
        {Object.entries(store.knowledgeFetchData.data).map(
          ([category, items]: any, index: any) => (
            <div key={index} className="space-y-3">
              <div className="text-xl font-semibold">{category}</div>
              {items.map((item: any) => (
                <button
                  key={item.id}
                  className={`text-start font-medium py-1.5 px-3 transition-all duration-200 border rounded-md w-full transition-all duration-300 
                      ${
                        selectedId === item.id
                          ? "bg-slate-100 dark:bg-slate-700 shadow-lg scale-105"
                          : "bg-muted"
                      }`}
                  onClick={async () => {
                    setSelectedId(item.id);
                    store.setKnowledgeFetchIDData(
                      (await knowledgeFetchIDGet(item.id)).data
                    );
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )
        )}
      </div>
      {store.knowledgeFetchIDData.data ? (
        <div className="w-full min-h-[65svh] p-6 bg-muted border rounded-lg hidden md:block md:col-span-3">
          <div className="flex flex-col gap-1">
            <div className="space-y-0.5">
              <div className="text-2xl font-semibold select-text">
                {store.knowledgeFetchIDData.data.title}
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
            <hr className="h-px my-2 border-0 bg-muted-foreground/65"></hr>
            <div className="flex-0 prose prose-sm dark:prose-invert prose-zinc max-w-none my-4 select-text">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {store.knowledgeFetchIDData.data.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
