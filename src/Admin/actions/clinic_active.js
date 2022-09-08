import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/clinic_active'


//-- ClinicActive List
export const clinicActiveRequest = () => ({
    type: actionTypes.GET_CLINIC_ACTIVE_LIST_REQUEST
})
export const clinicActiveSuccess = (response) => ({
    type: actionTypes.GET_CLINIC_ACTIVE_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const clinicActiveError = (error) => ({
    type: actionTypes.GET_CLINIC_ACTIVE_LIST_ERROR,
    payload: {
        error
    }
})
export const clinicActiveAction = (data) => {
    return dispatch => {
        dispatch(clinicActiveRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.clinicActiveList(FormData)
        .then(response => {
            dispatch(clinicActiveSuccess(response.data))
        })
        .catch(error => {
            dispatch(clinicActiveError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
