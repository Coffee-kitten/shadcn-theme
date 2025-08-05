import { v2boardRequest } from "@/utils/requests";

export const paymentDetailGet = (trade_no: any) => {
  return v2boardRequest({
    url: "/api/v1/user/order/detail",
    method: "get",
    params: {
      trade_no,
    },
  });
};

export const paymentMethodGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/order/getPaymentMethod",
    method: "get",
  });
};

export const orderCheckGet = (trade_no: string) => {
  return v2boardRequest({
    url: "/api/v1/user/order/check",
    method: "get",
    params: {
      trade_no,
    },
  });
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
