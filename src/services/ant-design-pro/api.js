// @ts-ignore

/* eslint-disable */
// import { request } from 'umi';
import request from '@/utils/request'
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options) {
  // return request('/api/currentUser', {
    return request('/api/admin/user', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  // return request('/api/login/account', {
    return request('api/auth/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 请求用户列表
export async function fetchUsers(params){
  return request('api/admin/users',{params})
}

// 用户禁用和启用
export async function lockUser(uid){
  return request.patch(`api/admin/users/${uid}/lock`)
}

// 添加用户
export async function addUser(params){
  return request.post('api/admin/users',{params})
}

// 用户更新
export async function updateUser(params,uid){
  return request.put(`/api/admin/users/${uid}`,{params})
}
// 获取用户详情
export async function detailUser(uid){
  return request(`/api/admin/users/${uid}`)
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
