import { v2boardRequest } from "@/utils/requests";

// 登录
export const signInPost = (email: string, password: string) => {
  return v2boardRequest({
    url: "/api/v1/passport/auth/login",
    method: "post",
    data: {
      email,
      password,
    },
  });
};

// 注册验证码
export const signUpMailPost = (email: string) => {
  return v2boardRequest({
    url: "/api/v1/passport/comm/sendEmailVerify",
    method: "post",
    data: {
      email,
    },
  });
};

// 注册
export const signUpPost = (
  email: string,
  password: string,
  email_code?: string,
  invite_code?: string
) => {
  return v2boardRequest({
    url: "/api/v1/passport/auth/register",
    method: "post",
    data: {
      email,
      password,
      invite_code,
      email_code,
    },
  });
};

// 忘记密码验证码
export const passwrodMailPost = (email: string) => {
  return v2boardRequest({
    url: "/api/v1/passport/comm/sendEmailVerify",
    method: "post",
    data: {
      email: email,
    },
  });
};

// 忘记密码
export const passwrodPost = (
  email: string,
  password: string,
  email_code: string
) => {
  return v2boardRequest({
    url: "/api/v1/passport/auth/forget",
    method: "post",
    data: {
      email: email,
      password: password,
      email_code: email_code,
    },
  });
};
