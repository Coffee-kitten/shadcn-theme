import {
  useEffect,
  useState,
  useV2boardUserData,
  ticketFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/ticket/Card1";
import { Card2 } from "@/views/home/widgets/ticket/Card2";
import { Loading } from "@/views/home/widgets/announcements/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";

export function Ticket() {
  const store = useV2boardUserData();
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: ticketFetchGet,
      setDataFn: store.setTicketFetchData,
    },
  ]);
  
  useEffect(() => {
    fetchAllData();
  }, []);
  
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="我的工单" />
      {currentView === 'list' && <Card1 />}
      <Card2 currentView={currentView} setCurrentView={setCurrentView} />
    </PageContainer>
  );
}
