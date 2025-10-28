import { v2boardRequest } from "@/utils/requests";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export function useUserUpdatePost() {
  const { t } = useTranslation();
  const userUpdatePost = async (remind: any, update: number) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/update",
        method: "post",
        data: {
          [remind]: update,
        },
      });
      return result;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("请求失败"),
        description: error?.data.message,
      });
      return null;
    }
  };
  return { userUpdatePost };
}

// 重置安全信息
export const resetSecurityGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/resetSecurity",
    method: "get",
  });
};

export function useChangePasswordPost() {
  const { t } = useTranslation();
  const changePasswordPost = async (
    old_password: string,
    new_password: string
  ) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/changePassword",
        method: "post",
        data: {
          old_password,
          new_password,
        },
      });
      return result;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("请求失败"),
        description:
          error.data?.errors?.old_password?.[0] ||
          error.data?.errors?.new_password?.[0] ||
          error.data?.message ||
          t("密码修改失败"),
      });
      return null;
    }
  };
  return { changePasswordPost };
}
