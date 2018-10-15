import axios from '../index.js';

// 登记人员
const updateHuman = humanData => {
  return axios({
    url: "/human/update",
    method: "post",
    data: {
      humanData
    }
  })
}

export default {
    updateHuman
}
