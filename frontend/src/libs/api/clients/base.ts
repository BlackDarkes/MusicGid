import axios from "axios";
import { API_CONFIG } from "../config/constants";

export const createBaseClient = () => {
  return axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    }
  })
}