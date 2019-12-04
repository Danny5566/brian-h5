import axios from "@/libs/api.request";

/**
 * 分享（会议）详情
 */
export const getMeetInfo = params => {
  return axios.request({
    url: `/meeting/getMeetingInfo/${params}`,
    method: "get"
  });
};

/**
 * 组织机构
 */
export const getOrg = params => {
  return axios.request({
    url: "/pocorganization/selectallorg",
    params: params,
    method: "get"
  });
};

/**
 * 用户查询
 */
export const getUsers = params => {
  return axios.request({
    url: "/pocuser/getPocUserPageInfo",
    params: params,
    method: "get"
  });
};

/**
 * 分页预约信息
 */
export const getH5MeetingPage = params => {
  return axios.request({
    url: "/meeting/H5/getH5MeetingPage",
    params: params,
    method: "get"
  });
};

/**
 * 新增预约
 */
export const addMeeting = data => {
  return axios.request({
    url: "/meeting/addMeeting",
    data: data,
    method: "post"
  });
};

/**
 * 取消预约
 */
export const delMeet = data => {
  return axios.request({
    url: `/meeting/delMeeting/${data}`,
    method: "delete"
  });
};

/**
 * 立即开会
 */
export const startNowMeeting = data => {
  return axios.request({
    url: "/meeting/startNowMeeting",
    data: data,
    method: "post"
  });
};

/**
 * 获取当前登录账号的主持人信息
 */
export const getPocUserInfo = () => {
  return axios.request({
    url: "/pocuser/getPocUserInfo",
    method: "get"
  });
};

/**
 * 微信分享配置
 */
export const getSign = params => {
  return axios.request({
    url: "/user/getSign",
    params: params,
    method: "get"
  });
};

/**
 * 通过appt中token，获取H5的token
 */
export const getH5Token = param => {
  return axios.request({
    url: "/user/getH5Token",
    method: "get",
    headers: {
      token: param
    }
  });
};
