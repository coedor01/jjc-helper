import axios from "axios";
import { getSession } from "next-auth/react";

function createService(baseURL: string) {
  // axios拦截器
  const service = axios.create({
    baseURL, // 开发服务器接口
    timeout: 60000, // request timeout
  });

  // 请求拦截器
  service.interceptors.request.use(
    async (config) => {
      const session = await getSession(); // 获取当前 session
      if (session) {
        console.log(`session=${JSON.stringify(session)}`);

        // config.headers["Authorization"] = `Bearer ${session.accessToken}`; // 将 token 添加到请求头
      }
      return config;
    },
    (error) => {
      console.log(error); // for debug
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  service.interceptors.response.use(
    (response) => {
      // 鉴权不通过则自动跳转登陆页面
      if (response.status === 401) {
        window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(
          window.location.href
        )}`;
      }
      return response;
    },
    (error) => {
      console.log(error); // for debug
      return Promise.reject(error);
    }
  );

  return service;
}

const Services = {
  localService: createService(""),
};

export default Services;
