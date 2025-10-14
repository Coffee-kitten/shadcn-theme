import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

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
