import { apiClient } from "@/libs/api";
import type { IMessageResponse } from "@/libs/api/types";
import type { IAdmin } from "../model/admin.interface";

const extractData = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);

export const adminApi = {
  login: async (data: { email: string; password: string }): Promise<{ message:IMessageResponse, admin: IAdmin }> => 
    extractData(apiClient.auth.login(data)),

  logout: async (): Promise<IMessageResponse> => extractData(apiClient.auth.logout()),

  refresh: async (): Promise<IMessageResponse> => extractData(apiClient.auth.refresh()),

  me: async (): Promise<IAdmin> => extractData(apiClient.auth.me()),
};