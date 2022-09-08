import { postRequestWithToken } from "./helper"

export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');

export const stateList = (data) => postRequestWithToken(data, 'state-list');

export const countryList = (data) => postRequestWithToken(data, 'country-list');

export const planList = (data) => postRequestWithToken(data, 'admin/plan-list');

export const knowledgeList = (data) => postRequestWithToken(data, 'admin/knowledge-list');

export const categoryList = (data) => postRequestWithToken(data, 'category-list');

export const treatmentWithType = (data) => postRequestWithToken(data, 'treatment-with-type');

export const unitList = (data) => postRequestWithToken(data, 'unit-list');

export const timeList = (data) => postRequestWithToken(data, 'time-list');

export const addTask = (data) => postRequestWithToken(data, 'submit-task-screen');

export const uploadMultiFile = (data) => postRequestWithToken(data, 'multi-upload-file');

export const userList = (data) => postRequestWithToken(data, 'user-list');

export const chatUserList = (data) => postRequestWithToken(data, 'chat-user-list');

export const getPatientChat = (data) => postRequestWithToken(data, 'chat-list');

export const getSpecializations = (data) => postRequestWithToken(data, 'specialization-list');

export const updateUser = (data) => postRequestWithToken(data, 'user-update');

export const changeUserStatus = (data) => postRequestWithToken(data, 'user-change-status');

export const forwardChat = (data) => postRequestWithToken(data, 'chat-forward');

export const getChatCount = (data) => postRequestWithToken(data, 'chat-count');

export const readChat = (data) => postRequestWithToken(data, 'read-chat');
