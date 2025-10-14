import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

export const infoGet = () => {
  const { data, error, isLoading, mutate } = useSWR<Record<string, any>>(
    `/api/v1/user/info`,
    v2boardRequest
  );
  return { data, error, isLoading, mutate };
};

export const subscribeGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/getSubscribe`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
