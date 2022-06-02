import request from './request'
interface LoginType {
  token: string;
  username: string;
  id: string
}
// 登录
export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}

// 注册
export const register = (data: { username: string; password: string; email: string }) => {
  return request({
    url: '/api/users/register',
    method: 'POST',
    data

  })
}

// 上传头像
export const upload = (data: { files }) => {
  return request({
    url: '/api/upload',
    method: 'POST',
    data
  })
}

// 获取用户
export const getUserList = (data: { currentPage:number, pageSize:number,name: string; gender: string, position: string }) => {
  return request({
    url: '/api/getUserList',
    method: 'POST',
    data
  })
}

// 修改密码
export const modifyPwd = (data: { username: string; oldPwd: string; newPwd: string }) => {
  return request({
    url: '/api/modifyPwd',
    method: 'POST',
    data
  })
}

// 添加人员
export const addUser = (data: { name: string; gender: string, position: string}) => {
  return request({
    url: '/api/addUser',
    method: 'POST',
    data
  })
}
// 删除人员
export const deleteUser = (data: { id: number; }) => {
  return request({
    url: '/api/deleteUser',
    method: 'POST',
    data
  })
}
// 获取商品列表
export const getGoodsList = (data: { name:string, classify:string, currentPage:number, pageSize:number }) => {
  return request({
    url: '/api/getGoodsList',
    method: 'POST',
    data
  })
}
// 添加商品
export const addGood = (data: { img: string; name: string, classify:string }) => {
  return request({
    url: '/api/addGood',
    method: 'POST',
    data
  })
}
// 删除商品
export const deleteGood = (data: { id: number; }) => {
  return request({
    url: '/api/deleteGood',
    method: 'POST',
    data
  })
}
// 获取商品分类
export const getGoodsClassify = () => {
  return request({
    url: '/api/getGoodsClassify',
    method: 'GET',
  })
}
// 获取数据总数
export const getTotal = () => {
  return request({
    url: '/api/getTotal',
    method: 'GET',
    // params: {
    //   username: data.username
    // }
  })
}
// 获取订单列表
export const getOrdersList = (data: { goodId: string; personId: string, currentPage:number, pageSize:number }) => {
  return request({
    url: '/api/getOrdersList',
    method: 'POST',
    data
  })
}
// 添加订单
export const addOrder = (data: { goodId: string; personId: string }) => {
  return request({
    url: '/api/addOrder',
    method: 'POST',
    data
  })
}
// 删除订单
export const deleteOrder = (data: { id: number; }) => {
  return request({
    url: '/api/deleteOrder',
    method: 'POST',
    data
  })
}