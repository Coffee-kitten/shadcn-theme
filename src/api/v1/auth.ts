import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

export const signUpGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/guest/comm/config`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
