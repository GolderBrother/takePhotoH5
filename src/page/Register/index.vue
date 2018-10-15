<template>
    <div class="register-wrapper" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading">
        <div class="register-container">
            <div class="register-header">
                <div class="r-header-avatar">
                    <!-- <img ref-"avatarImg" :src="avatar ? avatar : 'static/images/photograph.png'" :class="isAndroid && (avatar !== 'static/images/photograph.png') ? 'rotate' : '' " alt=""> -->
                    <img ref="avatarImg" :src="avatar ? avatar : 'static/images/photograph.png'" alt="">
                    <!-- <canvas v-show="showCanvas" id="canvas" ></canvas> -->
                </div>
                <div class="r-header-photo">
                    <div class="takephoto-btn">
                        拍照
                        <input ref="cameraFile" @change="takePhoto" type="file" accept="image/*" capture="camera" text="拍照" >
                    </div>
                </div>
            </div>
            <div class="register-body">
                
                <div class="register-body-form">
                    <form action="">
                        <div class="form-item">
                            <div class="form-item-label">
                                <span>您的手机号</span>
                                <span>You cell phone number</span>
                            </div>
                            <div class="form-item-content">
                                <span class="required">*</span>
                                <input required type="number" class="phonenumber" name="phonenumber" v-model="phonenumber">
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-item-label">
                                <span>您的姓名</span>
                                <span>You name</span>
                            </div>
                            <div class="form-item-content">
                                <span class="required">*</span>
                                <input required type="text" class="username" name="username" v-model="username">
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-item-label">
                                <span>您的公司名称</span> 
                                <span>You company name</span>
                            </div>
                            <div class="form-item-content">
                                <span class="required">*</span>
                                <input required type="text" class="company" name="company" v-model="company">
                            </div>
                        </div>
                        <div class="form-button-wrapper"> 
                            <div class="form-button">
                                <div class="b-register-btn" @click="confirm">
                                    确定
                                    <span>OK</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 在组件中使用store中的数据或方法时的辅助函数
// 可以在组件中使用 this.$store.commit('xxx')提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit调用（需要在根节点注入 store）。
import { mapGetters, mapMutations, mapActions } from "vuex";
import { compress } from "@/utils/uploadImage";
export default {
  name: "Register",
  data() {
    return {
      avatar: "",
      phonenumber: "",
      username: "",
      company: "",
      timer: null,
      loading: false,
      isAndroid: false
    };
  },
  created() {
    // 获取头像 base64 | path
    this.browserType();
    this.getUserData();
  },
  methods: {
    // 对象形式，可重命名 mutation 名称
    ...mapMutations({
      getUser: "GET_USER", // 将 `this.getUser()` 映射为 `this.$store.commit('GET_USER')`
      removeUser: "REMOVE_USER"
    }),
    // 数组形式，当映射的 methods 的名称与 vues中的 action 名称相同时使用
    ...mapActions([
      "setUser" // 将 `this.setUser()` 映射为 `this.$store.dispatch('setUser')` 如果有参数的话会自动加参数
    ]),
    // 新增人员
    async addHuman(phonenumber, username, company) {
      const humanData = {
        humanId: phonenumber,
        name: username,
        company: company
      };
      const res = await this.$http.addHuman(humanData);
      return res;
    },
    // 更新人员
    async updateHuman(phonenumber, username, company, avatar) {
      const _this = this;
      const humanData = {
        humanId: phonenumber,
        name: username,
        company: company
      };
      const res = await this.$http.updateHuman(humanData);
      const {
        data: { code: updateCode }
      } = res;
      if (updateCode === "00000000") {
        // 人员修改成功 可以登记
        const registerMsg = await _this.registerHuman(phonenumber, avatar);
        // console.log(registerMsg);
      } else if (updateCode === "EAS100003") {
        // 人员不存在
        alert(res.data.message);
        // _this.$toast.error(updateHumanRes.data.message);
      } else {
        // 未知错误 人员修改失败
        // const res = await _this.removeHuman(phonenumber);
        // console.log("removeHuman", res);
        alert("未知错误：人员更新失败");
        // _this.$toast.error("未知错误：人员更新失败");
      }
      return res;
    },
    // 登记人员
    async registerHuman(phonenumber, avatar) {
      // 去除前后 回车、换行符号
      avatar = avatar.replace(/[\r\n]/g, "");
      // const registerHumanRes = await this.$http.registerHuman({ phonenumber, avatar });
      const _this = this;
      const registerHumanRes = await this.$http.registerHuman({
        phonenumber,
        avatar
      });
      const registerCode = registerHumanRes.data.code;
      let registerRes = {
        code: "",
        msg: ""
      };
      _this.loading = true;
      if (registerCode === "00000000") {
        registerRes["msg"] = "登记成功";
        _this.saveUserData();
        // this.$toast.success("登记成功");
        // _this.$alert('登记成功', '提示', {
        //   okLabel: '确定'
        // }).then(() => {
        //   _this.$router.push("/welcome");
        // });
        alert("登记成功");
        _this.timer = setTimeout(() => {
          _this.$router.push("/welcome");
        }, 1200);
      } else {
        // 登记失败 删除人员
        registerRes["msg"] = "未检测到人脸";
        // this.$toast.warning("未检测到人脸");
        alert("未检测到人脸");
        const res = await _this.removeHuman(phonenumber);
        // console.log("removeHuman", res);
      }
      registerRes["code"] = registerCode;
      _this.loading = false;
      return registerRes;
    },
    // 移除人员
    async removeHuman(phonenumber) {
      const res = await this.$http.removeHuman(phonenumber);
      return res;
    },
    // 提交注册信息
    // 先新增人员后登记
    async confirm() {
      const _this = this;
      try {
        const { phonenumber, username, company, avatar } = _this;
        const mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/;

        if (!phonenumber || !username || !company) {
          alert("输入错误");
          return;
        }

        if (!mobileReg.test(phonenumber)) {
          alert("手机号格式不正确");
          return;
        }

        if (_this.user && !_this.user.userAvatar) {
          alert("请拍照人脸");
          return;
        }
        _this.loading = true;
        const addHumanRes = await _this.addHuman(
          phonenumber,
          username,
          company
        );
        const { code: addHumanCode } = addHumanRes.data;
        // console.log(addHumanRes.data);
        if (addHumanCode === "00000000") {
          // 人员信息不存在 正常登记成功
          const registerMsg = await _this.registerHuman(phonenumber, avatar);
          // console.log(registerMsg);
          // alert(addHumanRes.data.message);
          // console.log(msg);
        } else if (addHumanCode === "ECS000009") {
          // 人员信息已存在 可以调修改接口+登记人脸
          const updateHumanRes = await _this.updateHuman(
            phonenumber,
            username,
            company,
            avatar
          );
          // console.log(updateHumanRes);
        } else {
          // 登记 其他结果
          // console.log(addHumanRes.data);
          alert("未知错误：人员新增失败");
          // _this.$toast.error("未知错误：人员新增失败");
        }
        _this.loading = false;
      } catch (error) {
        console.log(error);
        _this.loading = false;
        // 出现异常 移除可能登记好的人员
        await _this.removeHuman(_this.phonenumber);
        alert("系统错误:" + error);
        //  _this.$toast.error("系统错误:" + error);
      }
    },
    // base64ToArrayBuffer(base64) {
    //   base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, "");
    //   let binaryString = atob(base64);
    //   let len = binaryString.length;
    //   let bytes = new Uint8Array(len);
    //   for (let i = 0; i < len; i++) {
    //     bytes[i] = binaryString.charCodeAt(i);
    //   }
    //   return bytes.buffer;
    // },
    // 判断浏览器类型
    browserType() {
      const u = navigator.userAgent;
      const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.isAndroid = isAndroid;
    },
    // 选择图片 前往拍照
    async takePhoto(event) {
      this.saveUserData();
      const _this = this;
      let userAvatar = "";
      let r = new FileReader();
      let file = event.target.files["0"];
      if (file) {
        r.readAsDataURL(file);
        r.onload = function(e) {
          let image = new Image();
          image.src = e.target.result;
          // 异步的 业务逻辑只能写在后面的函数
          image.onload = function() {
            let expectWidth = 480; //this.width;
            let expectHeight = 640; //this.height;
            // 0.1 为照片质量
            userAvatar = compress(this, expectWidth, expectHeight, 0.3);
            _this.avatar = userAvatar;
            _this.setUser({ ..._this.user, userAvatar });
            // _this.$store.dispatch("setUser", {
            //   ..._this.user,
            //   userAvatar: userAvatar
            // });
          };
        };
      } else {
        // 如果没有选择文件 则判断之前有无选择过 有的话获取之前选择的图片
        const { user, avatar } = _this;
        if (avatar) {
          // _this.$store.dispatch("setUser", {
          //   ...user,
          //   userAvatar: avatar
          // });
          _this.setUser({ ...user, avatar });
        } else {
          alert("请拍照人脸");
        }
      }
    },
    getUserData() {
      // const { phonenumber, username, company, userAvatar = "" } = this.user;
      // // 获取头像信息 如果没有值就从sessionStorage中获取
      // if (!userAvatar) {
      //   // this.$store.commit("GET_USER");
      //   this.getUser();
      // };
      this.getUser();
      const {
        phonenumber = "",
        username = "",
        company = "",
        userAvatar = ""
      } = this.user;
      // this.avatar =
      //   this.user && this.user.userAvatar
      //     ? this.user.userAvatar
      //     : "static/images/photograph.png";
      this.avatar = userAvatar
        ? userAvatar
        : "static/images/photograph.png";
      this.phonenumber = phonenumber;
      this.username = username;
      this.company = company;
    },
    saveUserData() {
      const {
        avatar: userAvatar = "",
        phonenumber = "",
        username = "",
        company = ""
      } = this;
      // this.$store.dispatch("setUser", { userAvatar, phonenumber, username, company });
      this.setUser({ userAvatar, phonenumber, username, company });
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  destroyed() {
    clearTimeout(this.timer);
    this.removeUser();
    // this.$store.commit("REMOVE_USER");
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>


