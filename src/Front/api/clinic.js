import { getRequest, postRequest , getRequestWithToken , postRequestWithToken } from "./helper"


export const clinicList = (data) => postRequestWithToken(data, 'admin/clinic-list'); 