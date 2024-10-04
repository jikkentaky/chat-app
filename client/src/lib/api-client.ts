import { HOST } from "@/utils/config";
import axios from "axios";

const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true,
});

export { apiClient };
