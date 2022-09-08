import axios from "axios"
import { appConstants } from 'Front/_constants/app.constants.js';
export const request = (data, action, method) => {
  return axios({
    method: method,
    url: appConstants.paAppURL+action,
      headers: {
        "Content-Type":"application/json"
      },
    data: data
  })
}

export const requestWithToken = (data, action, method) => {
  let sessionToken = localStorage.getItem('token');
  return axios({
    method: method,
    url: appConstants.paAppURL+action,
      headers: {
        "Authorization":sessionToken,
        "Content-Type":"application/json"
      },
    data: data
  })
}

export const testWithToken = (data, action, method) => {
  let sessionToken = localStorage.getItem('token');
  return axios({
    method: method,
    url: appConstants.paAppURL,
      headers: {
        "Authorization":sessionToken,
        "Content-Type":"application/json"
      },
    data: data
  })
}

export const getRequest = (data, action) => request(data, action, "GET")
export const postRequest = (data, action) => request(data, action, "POST")
export const patchRequest = (data, action) => request(data, action, "PATCH")
export const deleteRequest = (data, action) => request(data, action, "DELETE")
export const putRequest = (data, action) => request(data, action, "PUT")

export const getRequestWithToken = (data, action) => requestWithToken(data, action, "GET")
export const postRequestWithToken = (data, action) => requestWithToken(data, action, "POST")
export const patchRequestWithToken = (data, action) => requestWithToken(data, action, "PATCH")
export const deleteRequestWithToken = (data, action) => requestWithToken(data, action, "DELETE")
export const putRequestWithToken = (data, action) => requestWithToken(data, action, "PUT")

export const postTestWithToken = (data, action) => testWithToken(data, action, "POST")
