import axios from 'axios';
import config from './config';

function $axios(options) {
  return new Promise((resolve, reject) => {
    // const instance = axios.create({
    // //   baseURL: config.baseURL,
    //   headers: config.headers,
    //   transformResponse: [function (data) {}]
    // });
    try {
      axios.defaults.baseURL = config.baseURL;
      axios.defaults.headers = config.headers;
      axios.defaults.timeout = config.timeout;
      // axios请求拦截
      axios.interceptors.request.use(
        // 在发送请求之前做些什么
        config => {
          console.log("request...");
          if (config.method.toLocaleLowerCase() === 'post' ||
            config.method.toLocaleLowerCase() === 'put' ||
            config.method.toLocaleLowerCase() === 'delete') {
            //   config.data = qs.stringify(config.data)
          };

          return config;
        },
        // 对请求错误做些什么
        error => {
          console.log("request error:", error);
          // alert(error);
          return Promise.reject(error)
        }
      );
      // axios响应拦截
      axios.interceptors.response.use(
        response => {
          const { status, data:{code} } = response;
          if(status === 200 && code === "00000000"){
            console.log("request success");
          }
          // console.log(response);
          return response;
        },
        error => {
          // alert(error);
          return Promise.reject(error);
        }
      )

      //请求处理
      axios(options).then(res => resolve(res)).catch(err => reject(err));
    } catch (err) {
        console.error(err);
    }
  })
}

export default $axios;
