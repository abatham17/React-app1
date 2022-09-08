import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/language'

/* Language list  */
export const LanguageListRequest = () => ({
    type: actionTypes.GET_LANGUAGE_LIST_REQUEST
})
export const LanguageListSuccess = (response) => ({
    type: actionTypes.GET_LANGUAGE_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const LanguageListError = (error) => ({
    type: actionTypes.GET_LANGUAGE_LIST_ERROR,
    payload: {
        error
    }
})
export const languageListAction = (data) => {    
    return dispatch => {
        dispatch(LanguageListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc",
        }
        return API.languageList(FormData)
        .then(response => { 
            dispatch(LanguageListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(LanguageListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/* Language Status Change  */
export const LanguageChangeStatusRequest = () => ({
    type: actionTypes.GET_LANGUAGE_CHANGE_STATUS_REQUEST
})
export const LanguageChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_LANGUAGE_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const LanguageChangeStatusError = (error) => ({
    type: actionTypes.GET_LANGUAGE_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const languagechangestatusAction = (data) => {    
    console.log(data)
    return dispatch => {
        dispatch(LanguageChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeLanguageStatus(FormData)
        .then(response => {
            console.log(response)
            dispatch(LanguageChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(LanguageChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
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


