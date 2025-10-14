import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

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
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/invite/save`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
// 提现信息
export const commConfigGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/comm/config`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
