import { PageContainer, Head } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/user/card1";
import { Card2 } from "@/views/home/widgets/user/card2";
import { Card3 } from "@/views/home/widgets/user/card3";
import { useTranslation } from "react-i18next";
import { User } from "lucide-react";
import { infoGet } from "@/api/v1/base";
export default function UserPage() {
  const { t } = useTranslation();
  const { isLoading } = infoGet();

  return (
    <PageContainer loading={isLoading}>
      <Head badge={t("个人中心")} IconComponent={User} />
      <Card1 />
      <Card2 />
      <Card3 />
    </PageContainer>
  );
}
