import { postRequestWithToken } from "./helper"


export const userList = (data) => postRequestWithToken(data, 'admin/user-list');

export const addUser = (data) => postRequestWithToken(data, 'admin/add-user');

export const updateUser = (data) => postRequestWithToken(data, 'admin/update-user');

export const userDetail = (data) => postRequestWithToken(data, 'admin/user-detail');

export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');

export const userStatus = (data) => postRequestWithToken(data, 'admin/change-user-status');
