import { v2boardRequest } from "@/utils/requests";

export const paymentDetailGet = (trade_no: any) => {
  return v2boardRequest({
    url: "api/v1/user/order/detail?trade_no=" + trade_no,
    method: "get",
  });
};

export const paymentMethodGet = () => {
  return v2boardRequest({
    url: "api/v1/user/order/getPaymentMethod",
    method: "get",
  });
};

export const orderCheckGet = (trace_no: any) => {
  return v2boardRequest({
    url: "api/v1/user/order/check?trade_no=" + trace_no,
    method: "get",
  });
};

export const orderCheckoutPost = (trade_no: any, method: string) => {
  return v2boardRequest({
    url: "api/v1/user/order/checkout",
    method: "post",
    data: {
      trade_no: trade_no,
      method: method,
    },
  });
};
