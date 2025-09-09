import { useState } from "react";
import { toast } from "sonner";
import { inviteSaveGet } from "@/utils/common-imports";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import {
  inviteFetchGet,
  userTransferPost,
  ticketWithdrawPost,
} from "@/utils/common-imports";
import { useV2boardUserData } from "@/store/index";
import { useTranslation } from "react-i18next";

export const useInviteActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const { t } = useTranslation();
  const store = useV2boardUserData();

  const { fetchAllData } = useFetchMultipleData([
    {
      fetchFn: inviteFetchGet,
      setDataFn: store.setInviteFetchData,
    },
  ]);

  const handleGenerateNewLink = async () => {
    try {
      setIsLoading(true);
      await inviteSaveGet();
      await fetchAllData(true); // 更新邀请数据
      toast.success(t("已生成"));
    } catch (error: any) {
      toast.error(error.data?.message || t("生成失败"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToBalance = async () => {
    try {
      setGenerateLoading(true);
      await userTransferPost(Math.floor((transferAmount as any) * 100));
      await fetchAllData(true); // 更新数据
      toast.success(
        t("成功划转 ¥{transferAmount} 到账户余额", {
          transferAmount,
        })
      );
      setTransferAmount(""); // 清空输入框
    } catch (error: any) {
      toast.error(error.data?.errors?.transfer_amount?.[0] || "划转失败");
    } finally {
      setGenerateLoading(false);
    }
  };

  const handleWithdrawCommission = async (
    withdrawMethod: string,
    withdrawAccount: string
  ) => {
    try {
      setWithdrawLoading(true);
      await ticketWithdrawPost(withdrawMethod, withdrawAccount);
      await fetchAllData(true); // 更新数据
      toast.success(
        t("提现申请已提交，提现方式：{{withdrawMethod}}", {
          withdrawMethod,
        })
      );
    } catch (error: any) {
      toast.error(error.data?.message || t("提现失败"));
    } finally {
      setWithdrawLoading(false);
    }
  };

  return {
    isLoading,
    withdrawLoading,
    generateLoading,
    transferAmount,
    setTransferAmount,
    handleGenerateNewLink,
    handleTransferToBalance,
    handleWithdrawCommission,
  };
};
