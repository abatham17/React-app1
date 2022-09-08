import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/login'


//-- Login
export const loginUserRequest = () => ({
    type: actionTypes.GET_SIGNIN_USER_REQUEST
})
export const loginUserSuccess = (response) => ({
    type: actionTypes.GET_SIGNIN_USER_SUCCESS,
    payload: {
        response,
    }
})
export const loginUserError = (error) => ({
    type: actionTypes.GET_SIGNIN_USER_ERROR,
    payload: {
        error
    }
})
export const loginAction = (data) => {    
    return dispatch => {debugger
        dispatch(loginUserRequest())
        const FormData = {
            username:data.formData.username,
            password:data.formData.password
        }
        return API.signInUser(FormData)
        .then(response => { 
            dispatch(loginUserSuccess(response.data))
        })
        .catch(error => {   
            dispatch(loginUserError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 

