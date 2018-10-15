<template>
    <div class="takephoto-wrapper">
        <div class="takephoto-view-wrapper">
            <video v-show="showVideo" id="video" width="375px" height="375px" autoplay="autoplay"></video>
            <canvas v-show="showCanvas" id="canvas" width="375" height="375"></canvas>
        </div>
        <div class="takephoto-btn-wrapper">
            <div class="takephoto-btn">
                <div class="btn btn-retry" @click.navite="retry">
                    重新拍摄Retry
                </div>
            </div>
            <div class="takephoto-btn">
                <div class="btn btn-confirm" @click.navite="confirm">
                    确定OK
                </div>
            </div>
        </div>
        <mu-dialog title="提示" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
            前往登记
            <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
            <mu-button slot="actions" flat color="primary" @click="goRegister">确认</mu-button>
        </mu-dialog>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TakePhoto",
  data() {
    return {
      base64ByImg: "",
      showVideo: true,
      showCanvas: false,
      openAlert: false,
      canTakePhoto: true
    };
  },
  mounted() {
    this.getMedia();
  },
  methods: {
    ...mapActions(["setUser"]),
    // 提交照片
    submitPhoto() {
      const canvas = document.getElementById("canvas");
      // 将图片转成base64格式
      // toDataUrl可以接收2个参数，参数一：图片类型，参数二： 图片质量0-1（不传默认为0.92）
      this.base64ByImg = canvas.toDataURL("image/jpeg", 1);
      // 保存头像信息到 vuex
      console.log(this.user);
      // this.$store.dispatch("setUser", {
      //   ...this.user,
      //   avatarByBase64: this.base64ByImg
      // });
      this.setUser({
        ...this.user,
        avatarByBase64: this.base64ByImg
      });
    },
    // 拍照，提交照片，前往注册页面
    confirm() {
      // 拍照
      if (!this.canTakePhoto) return;
      this.takePhoto();
      // 保存照片 base64 格式
      this.submitPhoto();
      // 前往登记页面
      this.openAlertDialog();
    },
    // 开启摄像头
    async getMedia() {
      const _this = this;
      const constraints = {
        video: {
          width: 375,
          height: 375
        },
        audio: false,
        facingMode: "user" //调用前置摄像头
      };
      //获得video摄像头区域
      let video = document.getElementById("video");
      //这里介绍新的方法，navigator.mediaDevices.getUserMedia 返回一个 Promise对象
      // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
      // 避免数据没有获取到
      if (
        (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      ) {
        // try {
        //   const MediaStream = await navigator.mediaDevices.getUserMedia(
        //     constraints
        //   );
        //   video.srcObject = MediaStream;
        //   video.play();
        // } catch (error) {
        //   // Requested device not found 缺少设备
        //   console.log(error);
        //   this.canTakePhoto = false;
        //   this.$toast.error("缺少摄像头设备！");
        // }
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(MediaStream => {
            video.srcObject = MediaStream;
            video.play();
          })
          .catch(err => {
            console.log(err);
            if (err.NOT_SUPPORTED_err) {
              // _this.$toast.error(
              //   "对不起，您的浏览器不支持拍照功能，请使用其他浏览器"
              // );
            } else if (error.MANDATORY_UNSATISFIED_ERROR) {
              // _this.$toast.error("指定的媒体类型未接收到媒体流");
            } else {
              // _this.$toast.error(
              //   "缺少摄像头设备！"
              // );
            }
            _this.canTakePhoto = false;
          });
      } else {
        _this.canTakePhoto = false;
        // _this.$toast.error("不支持摄像头调用！");
      }
    },
    // 拍照
    takePhoto() {
      //获得Canvas对象
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let videoWidth = video.width || 375;
      let videoHeight = video.width || 375;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, videoHeight, videoWidth);
      this.showVideo = false;
      this.showCanvas = true;
    },
    // 重新拍摄
    retry() {
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      this.showVideo = true;
      this.showCanvas = false;
    },
    goRegister() {
      this.$router.push("/register");
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

