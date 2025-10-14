import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

export const announcementsFetchGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/notice/fetch`,
    v2boardRequest
  );
  return { data, error, isLoading };
};

export const trafficLogGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/stat/getTrafficLog`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
