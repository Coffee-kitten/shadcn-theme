import {
  useEffect,
  useV2boardUserData,
  paymentMethodGet,
  paymentDetailGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { useParams } from "react-router-dom";
import { Card1 } from "@/views/home/widgets/payment/card1";
import { Card4 } from "@/views/home/widgets/payment/card4";
import { Loading } from "@/views/home/widgets/payment/Loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";

// Create a client

export function Payment() {
  const store = useV2boardUserData();
  const { id } = useParams();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: paymentMethodGet,
      setDataFn: (data) => store.setPaymentMethodData(data),
    },
    {
      fetchFn: () => paymentDetailGet(id),
      setDataFn: (data) => store.setPaymentDetailData(data),
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
      <Head badge="订单详细" />
      {store.paymentDetailData?.data?.status == 0 ? <Card1 /> : <Card4 />}
    </PageContainer>
  );
}
