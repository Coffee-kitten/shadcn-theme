import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";
import { useTranslation } from "react-i18next";

export const knowledgeFetchGet = () => {
  const { i18n } = useTranslation();
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/knowledge/fetch?language=${i18n.language}`,
    v2boardRequest
  );
  return { data, error, isLoading };
};

export const knowledgeFetchIDGet = (id: number) => {
  const { i18n } = useTranslation();
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    id
      ? `/api/v1/user/knowledge/fetch?id=${id}&language=${i18n.language}`
      : null,
    v2boardRequest
  );
  return { data, error, isLoading };
};
