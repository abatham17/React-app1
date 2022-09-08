import { postRequest} from "./helper"
export const signInUser = (data) => postRequest(data, 'login');
