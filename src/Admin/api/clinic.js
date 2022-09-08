import {postRequestWithToken } from "./helper"


export const clinicList = (data) => postRequestWithToken(data, 'admin/clinic-list');
export const addClinic = (data) => postRequestWithToken(data, 'admin/add-clinic');
export const updateClinic = (data) => postRequestWithToken(data, 'admin/edit-clinic'); 
export const changeClinicStatus = (data) => postRequestWithToken(data, 'admin/change-clinic-status');
export const editClinic = (data) => postRequestWithToken(data, 'admin/edit-clinic');

export const clinicSubscription = (data) => postRequestWithToken(data, 'admin/subscription-list');
export const addClinicSubscription = (data) => postRequestWithToken(data, 'admin/add-subscription');
export const updateSubscription = (data) => postRequestWithToken(data, 'admin/edit-subscription'); 
export const changeSubscriptionStatus = (data) => postRequestWithToken(data, 'admin/change-subscription-status');
