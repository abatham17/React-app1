import {postRequestWithToken } from "./helper"


export const clinicCalendarList = (data) => postRequestWithToken(data, 'admin/calendar-list');
export const addClinicCalendar = (data) => postRequestWithToken(data, 'admin/add-calendar');
export const updateClinicCalendar = (data) => postRequestWithToken(data, 'admin/update-calendar');
export const changeCalendarStatus = (data) => postRequestWithToken(data, 'admin/change-calendar-status');
