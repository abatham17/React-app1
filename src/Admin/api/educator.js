import {  postRequestWithToken } from "./helper"

export const addEducator = (data) => postRequestWithToken(data, 'admin/add-educator-message'); 

export const educatorList = (data) => postRequestWithToken(data, 'admin/educator-message-list'); 

export const updateEducator = (data) => postRequestWithToken(data, 'admin/update-educator-message');

export const changeEducatorStatus = (data) => postRequestWithToken(data, 'admin/change-educator-message-status');

export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');