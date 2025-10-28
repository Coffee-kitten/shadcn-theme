import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
// 邀请详情
export const inviteDetailsGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/invite/details`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
// 邀请数据
export const inviteFetchGet = () => {
  const { data, error, isLoading, mutate } = useSWR<Record<string, any>>(
    `/api/v1/user/invite/fetch`,
    v2boardRequest
  );
  return { data, error, isLoading, mutate };
};
// 生成邀请码
export const inviteSaveGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/invite/save",
    method: "get",
  });
};
// 提现信息
export const commConfigGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/comm/config`,
    v2boardRequest
  );
  return { data, error, isLoading };
};

// 佣金划转
export function useUserTransferPost() {
  const userTransferPost = async (transfer_amount: number) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/transfer",
        method: "post",
        data: {
          transfer_amount,
        },
      });
      return result;
    } catch (error: any) {
      toast.error(error.data?.errors?.transfer_amount?.[0] || "划转失败");
      return null;
    }
  };
  return { userTransferPost };
}

// 申请提现
export function useTicketWithdrawPost() {
  const { t } = useTranslation();
  const ticketWithdrawPost = async (
    withdraw_method: string,
    withdraw_account: string
  ) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/ticket/withdraw",
        method: "post",
        data: {
          withdraw_method,
          withdraw_account,
        },
      });
      return result;
    } catch (error: any) {
      toast.error(error.data?.message || t("提现失败"));
      return null;
    }
  };
  return { ticketWithdrawPost };
}
