import axios from "../index.js"

// 新增人员
const addHuman = humanData => {
  return axios({
    url: "/human/add",
    method: "post",
    data: {
      humanData
    }
  })
}

export default {
  addHuman
}





