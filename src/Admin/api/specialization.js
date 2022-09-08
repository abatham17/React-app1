import { postRequestWithToken } from "./helper"


export const addspecialization = (data) => postRequestWithToken(data, 'admin/add-specialization');
export const updateSpecialization = (data) => postRequestWithToken(data, 'admin/update-specialization');
export const changeSpecializationStatus = (data) => postRequestWithToken(data, 'admin/change-status-specialization');
export const specializationList = (data) => postRequestWithToken(data, 'specialization-list');

