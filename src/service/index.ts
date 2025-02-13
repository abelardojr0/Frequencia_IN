import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});
let isRefreshing = false;
let refreshSubscribers: any = [];

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;

    if (error?.response?.status === 403) {
      alert("Usuário não tem permissão para a ação!");
    }

    if (
      error?.response?.status === 401 &&
      !originalConfig._retry &&
      (sessionStorage.getItem("refreshToken") ||
        localStorage.getItem("refreshToken"))
    ) {
      originalConfig._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refresh_token =
            sessionStorage.getItem("refreshToken") ||
            localStorage.getItem("refreshToken");

          const rs = await api.post("/refresh-token", { refresh_token });

          const access = rs.data.access_token;
          const refresh = rs.data.refresh_token;

          if (sessionStorage.getItem("authToken")) {
            sessionStorage.setItem("authToken", access);
            sessionStorage.setItem("refreshToken", refresh);
          } else {
            localStorage.setItem("authToken", access);
            localStorage.setItem("refreshToken", refresh);
          }

          // Executa todos os pedidos pendentes após a atualização do token
          refreshSubscribers.forEach((callback: any) => callback(access));
          refreshSubscribers = [];

          return api(originalConfig);
        } catch (_error) {
          console.log(_error);

          alert("Sessão expirada. Por favor, faça login novamente.");

          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("refreshToken");

          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");

          window.location.href = window.location.origin;
          return Promise.reject(_error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalConfig));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
