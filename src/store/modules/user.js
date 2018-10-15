import {
  Session
} from "@/utils/storage"
const state = {
  user: {
    userAvatar: "",
    phonenumber: "",
    username: "",
    company: ""
  }
}

const getters = {
  user: state => state.user
}

// 用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
const actions = {
  getUser: ({
    commit
  }) => {
    commit("GET_USER");
  },
  setUser: ({
    commit
  }, data) => {
    commit("SET_USER", data);
  },
  removeUser: ({
    commit
  }) => {
    commit("REMOVE_USER");
  }
}

// 类似函数，改变state数据的唯一途径，且不能用于处理异步事件
const mutations = {
  GET_USER: (state) => {
    const { userAvatar, phonenumber, username, company } = state.user;
    state.user.userAvatar = userAvatar || Session.get("userAvatar");
    state.user.phonenumber = phonenumber || Session.get("phonenumber");
    state.user.username = username || Session.get("username");
    state.user.company = company || Session.get("company");
  },
  SET_USER: (state, data) => {
    const { userAvatar="",phonenumber="",username="",company="" } = data;
    const userData = {
      userAvatar,
      phonenumber,
      username,
      company
    };
    state.user = userData;
    // 将数据存储在 session 中，防止刷新后 store 中的 state 清空
    Session.set("userAvatar", userAvatar);
    Session.set("phonenumber", phonenumber);
    Session.set("username", username);
    Session.set("company", company);
  },
  REMOVE_USER: (state) => {
    // state.user.userAvatar = "";
    // 页面销毁后 store state 不会被清空 需要手动清空
    state.user = {};
    let userSession = [];
    for (let ss in window.sessionStorage) {
      userSession.push(ss)
    }
    Session.remove(userSession);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
