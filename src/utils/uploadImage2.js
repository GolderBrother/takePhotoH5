import EXIF from "exif-js";
import JPEGEncoder from "jpeg-js";
import {
  promises
} from "fs";
const selectFileImage = function (fileObj) {
  let file = fileObj.files['0'];
  console.log(fileObj, file)
  //图片方向角 added by lzk
  let Orientation = null;

  let base64 = null;
  if (file) {
    console.log("正在上传,请稍后...");
    let rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
    if (!rFilter.test(file.type)) {
      //showMyTips("请选择jpeg、png格式的图片", false);
      return;
    }
    // let URL = URL || webkitURL;
    //获取照片方向角属性，用户旋转控制  异步的
    EXIF.getData(file, function () {
      // alert(EXIF.pretty(this));
      EXIF.getAllTags(this);
      //alert(EXIF.getTag(this, 'Orientation')); 
      Orientation = EXIF.getTag(this, 'Orientation') || 1;
      //return;
    });

    let oReader = new FileReader();
    oReader.onload = function (e) {
      //let blob = URL.createObjectURL(file);
      //_compress(blob, file, basePath);
      let image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        let expectWidth = this.naturalWidth;
        let expectHeight = this.naturalHeight;

        if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
          expectWidth = 800;
          expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
        } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
          expectHeight = 1200;
          expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
        }
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = expectWidth;
        canvas.height = expectHeight;
        ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
        //修复ios
        if (navigator.userAgent.match(/iphone/i)) {
          console.log('iphone');
          //alert(expectWidth + ',' + expectHeight);
          //如果方向角不为1，都需要进行旋转 added by lzk
          if (Orientation != "" && Orientation != 1) {
            alert('旋转处理');
            switch (Orientation) {
              case 6: //需要顺时针（向左）90度旋转
                alert('需要顺时针（向左）90度旋转');
                rotateImg(this, 'left', canvas);
                break;
              case 8: //需要逆时针（向右）90度旋转
                alert('需要顺时针（向右）90度旋转');
                rotateImg(this, 'right', canvas);
                break;
              case 3: //需要180度旋转
                alert('需要180度旋转');
                rotateImg(this, 'right', canvas); //转两次
                rotateImg(this, 'right', canvas);
                break;
            }
          }

          /*let mpImg = new MegaPixImage(image);
          mpImg.render(canvas, {
            maxWidth: 800,
            maxHeight: 1200,
            quality: 0.8,
            orientation: 8
          });*/
          // base64 = canvas.toDataURL("image/jpeg", 0.7);
        } else if (navigator.userAgent.match(/Android/i)) { // 修复android
          // let encoder = new JPEGEncoder();
          let encoder = JPEGEncoder;
          base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
        } else {
          //alert(Orientation);
          if (Orientation != "" && Orientation != 1) {
            //alert('旋转处理');
            switch (Orientation) {
              case 6: //需要顺时针（向左）90度旋转
                alert('需要顺时针（向左）90度旋转');
                rotateImg(this, 'left', canvas);
                break;
              case 8: //需要逆时针（向右）90度旋转
                alert('需要顺时针（向右）90度旋转');
                rotateImg(this, 'right', canvas);
                break;
              case 3: //需要180度旋转
                alert('需要180度旋转');
                rotateImg(this, 'right', canvas); //转两次
                rotateImg(this, 'right', canvas);
                break;
            }
          }
        }
        // 图片压缩
        base64 = canvas.toDataURL("image/jpeg", 0.7);
        console.log(base64.length);
        //uploadImage(base64);
        // $("#myImage").attr("src", base64);
      };
    };
    console.log(base64)
    oReader.readAsDataURL(file);
  } 
  // base64 = await getBase64Fn();
  console.log(base64);
  return base64;
}

const compressAndGetBase64 = (file) => {
  
}

//获取图片方向
const getPhotoOrientation = (file) => {
  let orientation = 1;
  EXIF.getData(file, function () {
    // alert(EXIF.pretty(this));
    EXIF.getAllTags(this);
    //alert(EXIF.getTag(this, 'Orientation')); 
    orientation = EXIF.getTag(this, 'Orientation') || 1;
    //return;
  });
  return orientation;
}

const chooseImg = fileObj => {
  let expectWidth = this.naturalWidth;
  let expectHeight = this.naturalHeight;

  if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
    expectWidth = 800;
    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
  } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
    expectHeight = 1200;
    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
  }
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = expectWidth;
  canvas.height = expectHeight;
  ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
  //修复ios
  if (navigator.userAgent.match(/iphone/i)) {
    console.log('iphone');
    //alert(expectWidth + ',' + expectHeight);
    //如果方向角不为1，都需要进行旋转 added by lzk
    if (Orientation != "" && Orientation != 1) {
      alert('旋转处理');
      switch (Orientation) {
        case 6: //需要顺时针（向左）90度旋转
          alert('需要顺时针（向左）90度旋转');
          rotateImg(this, 'left', canvas);
          break;
        case 8: //需要逆时针（向右）90度旋转
          alert('需要顺时针（向右）90度旋转');
          rotateImg(this, 'right', canvas);
          break;
        case 3: //需要180度旋转
          alert('需要180度旋转');
          rotateImg(this, 'right', canvas); //转两次
          rotateImg(this, 'right', canvas);
          break;
      }
    }

    /*let mpImg = new MegaPixImage(image);
    mpImg.render(canvas, {
      maxWidth: 800,
      maxHeight: 1200,
      quality: 0.8,
      orientation: 8
    });*/
    base64 = canvas.toDataURL("image/jpeg", 0.7);
  } else if (navigator.userAgent.match(/Android/i)) { // 修复android
    // let encoder = new JPEGEncoder();
    let encoder = JPEGEncoder;
    base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
  } else {
    //alert(Orientation);
    if (Orientation != "" && Orientation != 1) {
      //alert('旋转处理');
      switch (Orientation) {
        case 6: //需要顺时针（向左）90度旋转
          alert('需要顺时针（向左）90度旋转');
          rotateImg(this, 'left', canvas);
          break;
        case 8: //需要逆时针（向右）90度旋转
          alert('需要顺时针（向右）90度旋转');
          rotateImg(this, 'right', canvas);
          break;
        case 3: //需要180度旋转
          alert('需要180度旋转');
          rotateImg(this, 'right', canvas); //转两次
          rotateImg(this, 'right', canvas);
          break;
      }
    }
  }
  // 图片压缩
  base64 = canvas.toDataURL("image/jpeg", 0.7);
  console.log(base64.length);
  return base64;
  //uploadImage(base64);
  // $("#myImage").attr("src", base64);
};

//对图片旋转处理 added by lzk
const rotateImg = function (img, direction, canvas) {
  //alert(img);
  //最小与最大旋转方向，图片旋转4次后回到原方向  
  let min_step = 0;
  let max_step = 3;
  //let img = document.getElementById(pid);  
  if (img == null) return;
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
  let height = img.height;
  let width = img.width;
  //let step = img.getAttribute('step');  
  let step = 2;
  if (step == null) {
    step = min_step;
  }
  if (direction == 'right') {
    step++;
    //旋转到原位置，即超过最大值  
    step > max_step && (step = min_step);
  } else {
    step--;
    step < min_step && (step = max_step);
  }
  //img.setAttribute('step', step);  
  /*let canvas = document.getElementById('pic_' + pid);  
  if (canvas == null) {  
      img.style.display = 'none';  
      canvas = document.createElement('canvas');  
      canvas.setAttribute('id', 'pic_' + pid);  
      img.parentNode.appendChild(canvas);  
  }  */
  //旋转角度以弧度值为参数  
  let degree = step * 90 * Math.PI / 180;
  let ctx = canvas.getContext('2d');
  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      break;
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0);
      break;
  }
}

export {
  selectFileImage,
  rotateImg
}
