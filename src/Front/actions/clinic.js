import * as actionTypes from './actionTypes'
import * as API from 'Front/api/clinic'


//-- Login
export const clinicListRequest = () => ({
    type: actionTypes.GET_CLINIC_LIST_REQUEST
})
export const clinicListSuccess = (response) => ({
    type: actionTypes.GET_CLINIC_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const clinicListError = (error) => ({
    type: actionTypes.GET_CLINIC_LIST_ERROR,
    payload: {
        error
    }
})
export const clinicListAction = (data) => {    
    return dispatch => {
        dispatch(clinicListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.clinicList(FormData)
        .then(response => { 
            dispatch(clinicListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(clinicListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 

