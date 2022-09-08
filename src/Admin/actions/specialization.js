import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/specialization'


export const ADD_SPECILIZATION_REQUEST = "ADD_SPECILIZATION_REQUEST"
export const ADD_SPECILIZATION_SUCCESS = "ADD_SPECILIZATION_SUCCESS"
export const ADD_SPECILIZATION_ERROR = "ADD_SPECILIZATION_ERROR"
export const GET_SPECILIZATION_LIST_REQUEST = "GET_SPECILIZATION_LIST_REQUEST"
export const GET_SPECILIZATION_LIST_SUCCESS = "GET_SPECILIZATION_LIST_SUCCESS"
export const GET_SPECILIZATION_LIST_ERROR = "GET_SPECILIZATION_LIST_ERROR"

//-- Add Specilization
export const addSpecializationRequest = () => ({
    type: actionTypes.ADD_SPECILIZATION_REQUEST
})
export const addSpecializationSuccess = (response) => ({
    type: actionTypes.ADD_SPECILIZATION_SUCCESS,
    payload: {
        response,
    }
})
export const addSpecializationError = (error) => ({
    type: actionTypes.ADD_SPECILIZATION_ERROR,
    payload: {
        error
    }
})
export const addSpecializationAction = (data) => {    
    return dispatch => {
        dispatch(addSpecializationRequest())
        const FormData = {
            name:data.Name,
            description:data.description,
            status:data.status,
        }
        return API.addspecialization(FormData)
        .then(response => { 
            console.log(response)
            dispatch(addSpecializationSuccess(response.data))
        })
        .catch(error => {   
            dispatch(addSpecializationError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 
//-- List Specilization
export const specializationListRequest = () => ({
    type: actionTypes.GET_SPECILIZATION_LIST_REQUEST
})
export const specializationListSuccess = (response) => ({
    type: actionTypes.GET_SPECILIZATION_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const specializationListError = (error) => ({
    type: actionTypes.GET_SPECILIZATION_LIST_ERROR,
    payload: {
        error
    }
})
export const specializationListAction = (data) => {    
    return dispatch => {
        dispatch(specializationListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.specializationList(FormData)
        .then(response => { 
            dispatch(specializationListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(specializationListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


/* Update Specilization and Add form */

export const updateSpecializationRequest = () => ({
    type: actionTypes.GET_UPDATE_SPECILIZATION_REQUEST
})
export const updateSpecializationSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_SPECILIZATION_SUCCESS,
    payload: {
        response,
    }
})
export const updateSpecializationError = (error) => ({
    type: actionTypes.GET_UPDATE_SPECILIZATION_ERROR,
    payload: {
        error,
    }
})
export const updateSpecializationAction = (data) => { 
    return dispatch => {
        dispatch(updateSpecializationRequest())
        const FormData = {
            name:data.Name,
            description:data.description,
            status:data.status,
            id:data.id
        }
        return API.updateSpecialization(FormData)
        .then(response => {
            dispatch(updateSpecializationSuccess(response.data))
        })
        .catch(error => {   
            dispatch(updateSpecializationError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


/* Specilization Status Change  */
export const SpecializationChangeStatusRequest = () => ({
    type: actionTypes.GET_SPECILIZATION_CHANGE_STATUS_REQUEST
})
export const SpecializationChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_SPECILIZATION_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const SpecializationChangeStatusError = (error) => ({
    type: actionTypes.GET_SPECILIZATION_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const specializationchangestatusAction = (data) => {  
    return dispatch => {
        dispatch(SpecializationChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeSpecializationStatus(FormData)
        .then(response => {
            dispatch(SpecializationChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(SpecializationChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



