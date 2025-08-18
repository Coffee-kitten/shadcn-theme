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

export const useInviteActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
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
      await fetchAllData(); // 更新邀请数据
      toast.success("已生成");
    } catch (error: any) {
      toast.error(error.data?.message || "生成失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToBalance = async () => {
    try {
      await userTransferPost(Math.floor((transferAmount as any) * 100));
      await fetchAllData(); // 更新数据
      toast.success(`成功划转 ¥${transferAmount} 到账户余额`);
      setTransferAmount(""); // 清空输入框
    } catch (error: any) {
      toast.error(error.data?.errors?.transfer_amount?.[0] || "划转失败");
    }
  };

  const handleWithdrawCommission = async (
    withdrawMethod: string,
    withdrawAccount: string
  ) => {
    try {
      // TODO: 调用推广佣金提现的API，传入提现方式和账号
      await ticketWithdrawPost(withdrawMethod, withdrawAccount);
      await fetchAllData(); // 更新数据
      toast.success(`提现申请已提交，提现方式：${withdrawMethod}`);
    } catch (error: any) {
      toast.error(error.data?.message || "提现失败");
    }
  };

  return {
    isLoading,
    transferAmount,
    setTransferAmount,
    handleGenerateNewLink,
    handleTransferToBalance,
    handleWithdrawCommission,
  };
};
