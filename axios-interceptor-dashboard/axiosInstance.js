import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = "demo-auth-token";

    config.headers.Authorization = `Bearer ${token}`;
    console.log("Request sent:", config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);
    alert("Something went wrong while fetching data");
    return Promise.reject(error);
  }
);

export default axiosInstance;
