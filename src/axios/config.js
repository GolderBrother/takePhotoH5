export default {
    // 请求方式
    method: "post",
    // 基础url前缀
    // Mixed content: page at https was loaded over https but requested an insecure
    // solve:"http://192.168.200.236:3001" => "//192.168.200.236:3001" => "https://rldj.biohuishi.com:3001"
    // baseURL: "/",  // development
    baseURL: "https://rldjapi.biohuishi.com",  // product http:80端口 https:443端口 http://192.168.200.236:3001 映射=> "https://rldjapi.biohuishi.com"
    // baseURL: "/apiv1",
    // 请求头信息
    headers: {
        "Content-type": "application/json;charset=UTF-8",
    },
    // 参数
    data:{},
    // 设置超时时间  ms
    timeout: 100000,
    // 携带凭证 允许携带cookie 后端需要配合 allow credentials
    withCredentials: false,
    // 返回数据类型
    responseType: "json"
}