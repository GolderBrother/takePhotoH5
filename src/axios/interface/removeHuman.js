import axios from "../index.js"

// 移除人员
const removeHuman = phonenumber => {
  return axios({
    url: "/human/remove",
    method: "post",
    data: {
      phonenumber
    }
  })
}

export default {
  removeHuman
}
