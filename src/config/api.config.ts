import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response || {};

    if (status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { request };
