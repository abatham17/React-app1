import {  postRequestWithToken } from "./helper"


export const addLink = (data) => postRequestWithToken(data, 'admin/add-link');
export const updateLink = (data) => postRequestWithToken(data, 'admin/update-link'); 
export const changeLinkStatus = (data) => postRequestWithToken(data, 'admin/change-link-status');
export const linkList = (data) => postRequestWithToken(data, 'admin/link-list'); 
export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');
