// Exif.js 提供了 JavaScript 读取图像的原始数据的功能扩展，例如：拍照方向、相机设备型号、拍摄时间、ISO 感光度、GPS 地理位置等数据。
// http://code.ciaoca.com/javascript/exif-js/
// https://www.npmjs.com/package/exif-js
import EXIF from "exif-js";

//canvas 压缩图片 ratio 为图片质量
function compress(img, width, height, ratio) {
  let canvas, ctx, img64, orient;

  //获取图片方向
  orient = getPhotoOrientation(img);
  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  ctx = canvas.getContext("2d");

  //如果图片方向等于6 ，则旋转矫正，反之则不做处理
  if (orient == 6) {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(90 * Math.PI / 180);
    ctx.drawImage(img, 0 - height / 2, 0 - width / 2, height, width);
    ctx.restore();
  } else if (orient == 8) {
    ctx.save();
    ctx.translate(0, height / 2);
    ctx.rotate(270 * Math.PI / 180);
    ctx.drawImage(img, 0 - height / 2, 0, height, width);
    ctx.restore();
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  img64 = canvas.toDataURL("image/jpeg", ratio);
  return img64;
}

//获取上传的图片方向
function getPhotoOrientation(img) {
  let orient = 1;
  try {
    EXIF.getData(img, function () {
      orient = EXIF.getTag(this, 'Orientation');
    });
  } catch (e) {
    console.log(e.name + ": " + e.message);
    return 1;
  }
  return orient;
}

const selectFileImage = (fileObj) => {
  let r = new FileReader();
  let file = fileObj.files['0'];
  let base64 = "";
  if (file) {
    r.readAsDataURL(file);
    r.onload = function (e) {
      let image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        let expectWidth = 480; //this.width;  
        let expectHeight = 640; //this.height;  
        base64 = compress(this, expectWidth, expectHeight, 1);
      }
    };
  }
  console.log(base64);
}

export {
  compress
}
