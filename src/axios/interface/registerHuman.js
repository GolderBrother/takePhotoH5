import axios from '../index.js';

// 登记人员
const registerHuman = data => {
  // const registerData = {
  //   lang: "zh-CN",
  //   sid: "face/register",
  //   payload: {
  //     params: {
  //       humanId: data.phonenumber,
  //       face: [{
  //         index: 1,
  //         data: data.avatar
  //       }]
  //     }
  //   }
  // };
  return axios({
    url: "/face/register",
    method: "post",
    // data: registerData
    data:{
      phonenumber: data.phonenumber,
      avatar: data.avatar
    }
  });
}

export default {
    registerHuman
}
