import { postRequestWithToken } from "./helper"

export const addFaq = (data) => postRequestWithToken(data, 'add-faq');

export const addKnowledge = (data) => postRequestWithToken(data, 'add-knowledge');

export const addClinicLink = (data) => postRequestWithToken(data, 'add-clinic-link');

export const addEducatorMessage = (data) => postRequestWithToken(data, 'add-educator-message');

export const changePassword = (data) => postRequestWithToken(data, 'change-password');

export const addClinicHoliday = (data) => postRequestWithToken(data, 'add-clinic-holiday');