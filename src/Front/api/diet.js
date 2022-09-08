import { postRequestWithToken } from "./helper"

export const dietList = (data) => postRequestWithToken(data, 'diet');

export const printDiet = (data) => postRequestWithToken(data, 'print-diet');