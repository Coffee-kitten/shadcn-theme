import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

export const serverFetchGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/server/fetch`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
