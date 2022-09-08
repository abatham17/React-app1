import { postRequestWithToken } from "./helper"


export const addLanguage = (data) => postRequestWithToken(data, 'admin/add-language');
export const updateLanguage = (data) => postRequestWithToken(data, 'admin/update-language'); 
export const changeLanguageStatus = (data) => postRequestWithToken(data, 'admin/change-status-language');
export const languageList = (data) => postRequestWithToken(data, 'language-list'); 
export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');
