import {
  useEffect,
  useV2boardUserData,
  orderFetchGet,
  Head,
  PageContainer,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/order/card1";
import { Loading } from "@/views/home/widgets/order/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function Order() {
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: orderFetchGet,
      setDataFn: (data) => store.setOrderFetchData(data),
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="订单管理" />
      <Card1 />
    </PageContainer>
  );
}
