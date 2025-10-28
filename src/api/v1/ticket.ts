import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
export const ticketFetchGet = () => {
  const { data, error, isLoading, mutate } = useSWR<Record<string, any>>(
    `/api/v1/user/ticket/fetch`,
    v2boardRequest
  );
  return { data, error, isLoading, mutate };
};
export const ticketFetchIdGet = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR<Record<string, any>>(
    `/api/v1/user/ticket/fetch?id=${id}`,
    v2boardRequest,
    {
      refreshInterval: 5000,
    }
  );
  return { data, error, isLoading, mutate };
};

export function useTicketSavePost() {
  const ticketSavePost = async (data: {
    subject: string;
    level: number;
    message: string;
  }) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/ticket/save",
        method: "post",
        data,
      });
      return result;
    } catch (error: any) {
      toast.warning(error?.data?.message);
      return null;
    }
  };
  return { ticketSavePost };
}
export function useTicketReplyPost() {
  const ticketReplyPost = async (id: number, message: string) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/ticket/reply",
        method: "post",
        data: {
          id,
          message,
        },
      });
      return result;
    } catch (error: any) {
      toast.error(error?.data?.message);
      return null;
    }
  };
  return { ticketReplyPost };
}
export function useTicketClosePost() {
  const { t } = useTranslation();
  const ticketClosePost = async (id: number) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/ticket/close",
        method: "post",
        data: {
          id,
        },
      });
      return result;
    } catch (error: any) {
      toast.error(t("工单关闭失败，请重试"));
      return null;
    }
  };
  return { ticketClosePost };
}
