import {postRequestWithToken } from "./helper"


export const clinicActiveList = (data) => postRequestWithToken(data, 'admin/active-clinic-list');
