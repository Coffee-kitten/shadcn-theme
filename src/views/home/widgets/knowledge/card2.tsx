import { useState } from "react";

import { Card3 } from "@/views/home/widgets/knowledge/card3";
import { knowledgeFetchGet } from "@/api/v1/knowledge";
export function Card2() {
  const { data } = knowledgeFetchGet();
  const [selectedId, setSelectedId] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  // const handleItemClick = async (item: any) => {
  //   setSelectedId(item.id);
  //   setOpenDrawer(true);

  //   // 如果是第一次点击该项，才去获取数据
  //   if (selectedId != item.id) {
  //     const response = (await knowledgeFetchIDGet(item.id)).data;

  //     if (response.data) {
  //       store.setKnowledgeFetchIDData((prevData: any) => ({
  //         ...prevData,
  //         [response.data.id]: response.data,
  //       }));
  //     }
  //   }
  // };
  const setDrawer = (data: boolean) => {
    setOpenDrawer(data);
    if (!data) {
      setSelectedId(null);
    }
  };
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="flex flex-col gap-6 md:gap-8 md:col-span-1">
        {Object.entries(data?.data.data).map(
          ([category, items]: any, index: any) => (
            <div key={index} className="space-y-3">
              <div className="text-xl font-semibold">{category}</div>
              {items.map((item: any) => (
                <button
                  key={item.id}
                  className={`text-start font-medium py-1.5 px-3 transition-all duration-200 border rounded-md w-full
                      ${
                        selectedId == item.id
                          ? "bg-slate-100 dark:bg-slate-700 shadow-lg scale-y-105"
                          : "bg-muted"
                      }`}
                  onClick={() => {
                    setSelectedId(item.id);
                    setDrawer(true);
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )
        )}
      </div>
      <Card3
        openDrawer={openDrawer}
        setOpenDrawer={setDrawer}
        selectedId={selectedId}
      />
    </div>
  );
}
