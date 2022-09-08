import {  postRequestWithToken } from "./helper"

export const visitList = (data) => postRequestWithToken(data, 'visit-list'); 

export const patientRegistration = (data) => postRequestWithToken(data, 'patient-registration'); 

export const patientEdit = (data) => postRequestWithToken(data, 'patient-edit');

export const patientOut = (data) => postRequestWithToken(data, 'patient-out'); 

export const nextVisit = (data) => postRequestWithToken(data, 'next-visit'); 

export const educatorMsgList = (data) => postRequestWithToken(data, 'educator-message-list');

export const categoryList = (data) => postRequestWithToken(data, 'category-list');

export const knowledgeList = (data) => postRequestWithToken(data, 'knowledge-list');

export const printShareDocument = (data) => postRequestWithToken(data, 'add-documents');

export const taskList = (data) => postRequestWithToken(data, 'document-task-list');

export const changeStatus = (data) => postRequestWithToken(data, 'change-status');

export const holidayList = (data) => postRequestWithToken(data, 'holiday-list');

export const history = (data) => postRequestWithToken(data, 'history');