import { postRequestWithToken } from "./helper"

export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');

export const stateList = (data) => postRequestWithToken(data, 'state-list');

export const countryList = (data) => postRequestWithToken(data, 'country-list');

export const planList = (data) => postRequestWithToken(data, 'admin/plan-list');
export const addPlan = (data) => postRequestWithToken(data, 'admin/add-plan');
export const updatePlan = (data) => postRequestWithToken(data, 'admin/update-plan');
export const changePlanStatus = (data) => postRequestWithToken(data, 'admin/change-plan-status');

export const addKnowledge = (data) => postRequestWithToken(data, 'admin/add-knowledge');
export const updateKnowledge = (data) => postRequestWithToken(data, 'admin/update-knowledge');
export const changeKnowledgeStatus = (data) => postRequestWithToken(data, 'admin/change-knowledge-status');

export const knowledgeList = (data) => postRequestWithToken(data, 'admin/knowledge-list');
export const categoryList = (data) => postRequestWithToken(data, 'category-list');

export const updateTermcondition = (data) => postRequestWithToken(data, 'admin/update-termCondition');

export const termconditionList = (data) => postRequestWithToken(data, 'termCondition');
