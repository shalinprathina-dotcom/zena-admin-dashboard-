import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      return Promise.reject(
        new Error("Unable to reach the admin API. Make sure the backend is running.")
      );
    }

    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }

    if (error.response?.data?.error) {
      return Promise.reject(new Error(error.response.data.error));
    }

    return Promise.reject(new Error(error.message || "Request failed"));
  }
);

export const getDashboardData = async () => {
  const response = await api.get("/api/admin/dashboard");
  return response.data;
};

export const getContactRequests = async () => {
  const response = await api.get("/api/admin/contact_requests");
  return response.data;
};

export const deleteContactRequest = async (id) => {
  const response = await api.delete(`/api/admin/contact_request/${id}`);
  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get("/api/admin/chat_history");
  return response.data;
};

export const deleteChatSession = async (sessionId) => {
  const response = await api.delete(`/api/admin/chat/${sessionId}`);
  return response.data;
};
