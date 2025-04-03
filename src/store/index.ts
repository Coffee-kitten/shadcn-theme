import { create } from "zustand";

interface UserData {
  isLoading: boolean;
  registerData: any;
  infoData: any;
  subscribeData: any;
  trafficLogData: any;
  serverFetchData: any;
  noticeFetchData: any;
  configData: any;
  botInfoData: any;
  orderFetchData: any;
  inviteDetailsData: any;
  inviteFetchData: any;
  planFetchData: any;
  planActive: number;
  planFetchIDData: any;
  paymentDetailData: any;
  paymentMethodData: any;
  knowledgeFetchData: any;
  knowledgeFetchIDData: any;
  knowledgeActive: boolean;
  ticketFetchData: any;
  ticketFetchIDData: any;
  setIsLoading: (value: boolean) => void;
  setRegisterData: (data: any) => void;
  setInfoData: (data: any) => void;
  setSubscribeData: (data: any) => void;
  setTrafficLogData: (data: any) => void;
  setServerFetchData: (data: any) => void;
  setNoticeFetchData: (data: any) => void;
  setConfigData: (data: any) => void;
  setBotInfoData: (data: any) => void;
  setOrderFetchData: (data: any) => void;
  setInviteDetailsData: (data: any) => void;
  setInviteFetchData: (data: any) => void;
  setPlanFetchData: (data: any) => void;
  setPlanActive: (value: number) => void;
  setPlanFetchIDData: (data: any) => void;
  setPaymentDetailData: (data: any) => void;
  setPaymentMethodData: (data: any) => void;
  setKnowledgeFetchData: (data: any) => void;
  setKnowledgeFetchIDData: (data: any) => void;
  setKnowledgeActive: (value: boolean) => void;
  setTicketFetchData: (data: any) => void;
  setTicketFetchIDData: (data: any) => void;
}

export const useV2boardUserData = create<UserData>((set) => ({
  isLoading: false,
  registerData: {},
  infoData: {},
  subscribeData: {},
  trafficLogData: {},
  serverFetchData: {},
  noticeFetchData: {},
  configData: {},
  botInfoData: {},
  orderFetchData: {},
  inviteDetailsData: {},
  inviteFetchData: {},
  planFetchData: {},
  planActive: 1,
  planFetchIDData: {},
  paymentDetailData: {},
  paymentMethodData: {},
  knowledgeFetchData: {},
  knowledgeFetchIDData: {},
  knowledgeActive: false,
  ticketFetchData: {},
  ticketFetchIDData: {},
  // Setters
  setIsLoading: (value) => set({ isLoading: value }),
  setRegisterData: (data) => set({ registerData: data }),
  setInfoData: (data) => set({ infoData: data }),
  setSubscribeData: (data) => set({ subscribeData: data }),
  setTrafficLogData: (data) => set({ trafficLogData: data }),
  setServerFetchData: (data) => set({ serverFetchData: data }),
  setNoticeFetchData: (data) => set({ noticeFetchData: data }),
  setConfigData: (data) => set({ configData: data }),
  setBotInfoData: (data) => set({ botInfoData: data }),
  setOrderFetchData: (data) => set({ orderFetchData: data }),
  setInviteDetailsData: (data) => set({ inviteDetailsData: data }),
  setInviteFetchData: (data) => set({ inviteFetchData: data }),
  setPlanFetchData: (data) => set({ planFetchData: data }),
  setPlanActive: (value) => set({ planActive: value }),
  setPlanFetchIDData: (data) => set({ planFetchIDData: data }),
  setPaymentDetailData: (data) => set({ paymentDetailData: data }),
  setPaymentMethodData: (data) => set({ paymentMethodData: data }),
  setKnowledgeFetchData: (data) => set({ knowledgeFetchData: data }),
  setKnowledgeFetchIDData: (updater) =>
    set((state) => ({
      knowledgeFetchIDData: {
        data: {
          ...updater(state.knowledgeFetchIDData.data),
        },
      },
    })),
  setKnowledgeActive: (value) => set({ knowledgeActive: value }),
  setTicketFetchData: (data) => set({ ticketFetchData: data }),
  setTicketFetchIDData: (data) => set({ ticketFetchIDData: data }),
}));
