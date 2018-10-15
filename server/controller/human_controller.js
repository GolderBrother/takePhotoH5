/**
 * Created by james on 2018/10/10.
 */
// const request = require('sync-request');
const request = require('request-promise');
const config = require('../config')
const url = config.baseURL;

// 新增人员
const addHuman = async (ctx, next) => {
  const {
    humanData
  } = ctx.request.body;
  console.log(humanData);
  const data = {
    lang: "zh-CN",
    sid: "human/add",
    payload: {
      params: humanData
    }
  }
  const res = await request({
    uri: `${url}/human/add`,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: data
  }).then(res => Promise.resolve(res)).catch(err => Promise.reject(err));
  ctx.status = 200;
  ctx.body = res;
}

// 更新人员
const updateHuman = async (ctx, next) => {
  const {
    humanData
  } = ctx.request.body;
  console.log(humanData);
  const data = {
    lang: "zh-CN",
    sid: "human/update",
    payload: {
      params: humanData
    }
  }
  const res = await request({
    uri: `${url}/human/update`,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: data
  }).then(res => Promise.resolve(res)).catch(err => Promise.reject(err));
  ctx.status = 200;
  ctx.body = res;
}

// 登记人员
const registerHuman = async (ctx, next) => {
  const body = ctx.request.body;
  const {
    phonenumber,
    avatar
  } = body;
  const registerData = {
    lang: "zh-CN",
    sid: "face/register",
    payload: {
      params: {
        humanId: phonenumber,
        face: [{
          index: 1,
          data: avatar
        }]
      }
    }
  };
  const res = await request({
    uri: `${url}/face/register`,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: registerData
  }).then(res => Promise.resolve(res)).catch(err => Promise.reject(err));
  ctx.status = 200;
  ctx.body = res;
}

// 移除人员
const removeHuman = async (ctx, next) => {
  const {
    phonenumber
  } = ctx.request.body;
  const humanData = {
    lang: "zh-CN",
    sid: "human/remove",
    payload: {
      params: {
        humanId: phonenumber
      }
    }
  };
  const res = await request({
    uri: `${url}/human/remove`,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: humanData
  }).then(res => Promise.resolve(res)).catch(err => Promise.reject(err));
  ctx.status = 200;
  ctx.body = res;
}

module.exports = {
  addHuman,
  updateHuman,
  registerHuman,
  removeHuman
}
