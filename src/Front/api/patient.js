import {  postRequestWithToken } from "./helper"

export const patientList = (data) => postRequestWithToken(data, 'patient-list');

export const addVisit = (data) => postRequestWithToken(data, 'add-visit');
