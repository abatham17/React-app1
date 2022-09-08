import * as actionTypes from './actionTypes'
import * as API from 'Front/api/patient'


//-- Patient List
export const patientListRequest = () => ({
    type: actionTypes.GET_PATIENT_LIST_REQUEST
})
export const patientListSuccess = (response) => ({
    type: actionTypes.GET_PATIENT_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const patientListError = (error) => ({
    type: actionTypes.GET_PATIENT_LIST_ERROR,
    payload: {
        error
    }
})
export const patientListAction = (data) => {
    return dispatch => {
        dispatch(patientListRequest())
        
        return API.patientList(data)
        .then(response => {
            dispatch(patientListSuccess(response.data))
        })
        .catch(error => {
            dispatch(patientListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//-- Add Patient Visit
export const addVisitRequest = () => ({
    type: actionTypes.GET_ADD_VISIT_REQUEST
})
export const addVisitSuccess = (response) => ({
    type: actionTypes.GET_ADD_VISIT_SUCCESS,
    payload: {
        response,
    }
})
export const addVisitError = (error) => ({
    type: actionTypes.GET_ADD_VISIT_ERROR,
    payload: {
        error
    }
})
export const addVisitAction = (data) => { 
    return dispatch => {
        dispatch(addVisitRequest())
        const FormData = {
            patient_id:data.patient_id,
            height:data.height,
            weight:data.weight,
            remark:data.remark,
        }
        return API.addVisit(FormData)
        .then(response => { 
            dispatch(addVisitSuccess(response.data))
        })
        .catch(error => { 
            dispatch(addVisitError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
