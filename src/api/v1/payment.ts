import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

export const paymentDetailGet = (trade_no: any) => {
  const { data, error, isLoading, mutate } = useSWR<Record<string, any>>(
    `/api/v1/user/order/detail?trade_no=${trade_no}`,
    v2boardRequest
  );
  return { data, error, isLoading, mutate };
};
export const paymentMethodGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/order/getPaymentMethod`,
    v2boardRequest
  );
  return { data, error, isLoading };
};
export const orderCheckGet = (trade_no: any) => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/order/check?trade_no=${trade_no}`,
    v2boardRequest,
    {
      refreshInterval: 5000,
    }
  );
  return { data, error, isLoading };
};
export const orderCheckoutPost = (trade_no: string, method: string) => {
  return v2boardRequest({
    url: "/api/v1/user/order/checkout",
    method: "post",
    data: {
      trade_no,
      method,
    },
  });
};
