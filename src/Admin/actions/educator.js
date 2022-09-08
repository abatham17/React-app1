import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/educator'
/* Add Educator list and add form */
export const addEducatorRequest = () => ({
    type: actionTypes.GET_ADD_EDUCATOR_REQUEST
})
export const addEducatorSuccess = (response) => ({
    type: actionTypes.GET_ADD_EDUCATOR_SUCCESS,
    payload: {
        response,
    }
})
export const addEducatorError = (error) => ({
    type: actionTypes.GET_ADD_EDUCATOR_ERROR,
    payload: {
        error
    }
})
export const addEducatorAction = (data) => { 
    return dispatch => {
        dispatch(addEducatorRequest())
        const FormData = {
                message:data.message,
                description:data.description,
                clinicId:data.clinicId,
                clinicName:data.clinicName,
                status: data.status,
                specializations:data.specialization,
               
        }
        return API.addEducator(FormData)
        .then(response => { 
            dispatch(addEducatorSuccess(response.data))
        })
        .catch(error => {   
            dispatch(addEducatorError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


/* Update Educator list and add form */
export const updateEducatorRequest = () => ({
    type: actionTypes.GET_UPDATE_EDUCATOR_REQUEST
})
export const updateEducatorSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_EDUCATOR_SUCCESS,
    payload: {
        response,
    }
})
export const updateEducatorError = (error) => ({
    type: actionTypes.GET_UPDATE_EDUCATOR_ERROR,
    payload: {
        error
    }
})
export const updateEducatorAction = (data) => { 
    return dispatch => {
        dispatch(updateEducatorRequest())
        debugger
        const FormData = {
                message:data.message,
                description:data.description,
                clinicId:data.clinicId,
                clinicName:data.clinicName,
                status: data.status,
                specializations:data.specializations,
                id:data.id,
               
        }
        return API.updateEducator(FormData)
        .then(response => { 
            dispatch(updateEducatorSuccess(response.data))
        })
        .catch(error => {   
            dispatch(updateEducatorError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


/* Link Status Change  */
export const EducatorChangeStatusRequest = () => ({
    type: actionTypes.GET_EDUCATOR_CHANGE_STATUS_REQUEST
})
export const EducatorChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_EDUCATOR_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const EducatorChangeStatusError = (error) => ({
    type: actionTypes.GET_EDUCATOR_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const educatorchangestatusAction = (data) => {  
    return dispatch => {
        dispatch(EducatorChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeEducatorStatus(FormData)
        .then(response => {
            dispatch(EducatorChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(EducatorChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


/* Educator list  */
export const EducatorListRequest = () => ({
    type: actionTypes.GET_EDUCATOR_LIST_REQUEST
})
export const EducatorListSuccess = (response) => ({
    type: actionTypes.GET_EDUCATOR_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const EducatorListError = (error) => ({
    type: actionTypes.GET_EDUCATOR_LIST_ERROR,
    payload: {
        error
    }
})
export const educatorListAction = (data) => {    
    return dispatch => {
        dispatch(EducatorListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc",
        }
        return API.educatorList(FormData)
        .then(response => { 
            dispatch(EducatorListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(EducatorListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Upload File
export const uploadFileRequest = () => ({
    type: actionTypes.POST_UPLOAD_FILE_REQUEST
})
export const uploadFileSuccess = (response) => ({
    type: actionTypes.GET_UPLOAD_FILE_SUCCESS,
    payload: {
        response,
    }
})
export const uploadFileError = (error) => ({
    type: actionTypes.GET_UPLOAD_FILE_ERROR,
    payload: {
        error
    }
})
export const uploadFileAction = (data) => {
    return dispatch => {
        dispatch(uploadFileRequest())
        // const FormData = {
        //     file:data
        // }

        let formData = new FormData();
        formData.append('file',data);
        return API.uploadFile(formData)
        .then(response => {
            dispatch(uploadFileSuccess(response.data))
        })
        .catch(error => {
            dispatch(uploadFileError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}




