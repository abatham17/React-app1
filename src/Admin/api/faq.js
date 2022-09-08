import { postRequestWithToken } from "./helper"

export const addFaq = (data) => postRequestWithToken(data, 'admin/add-faq');

export const updateFaq = (data) => postRequestWithToken(data, 'admin/update-faq');

export const faqList = (data) => postRequestWithToken(data, 'admin/faq-list');

export const changeFaqStatus = (data) => postRequestWithToken(data, 'admin/change-status-faq');

export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');
