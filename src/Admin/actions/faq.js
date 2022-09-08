import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/faq'
/* Add Faq list and Add form */

export const addFaqRequest = () => ({
    type: actionTypes.GET_ADD_FAQ_REQUEST
})
export const addFaqSuccess = (response) => ({
    type: actionTypes.GET_ADD_FAQ_SUCCESS,
    payload: {
        response,
    }
})
export const addFaqError = (error) => ({
    type: actionTypes.GET_ADD_FAQ_ERROR,
    payload: {
        error,
    }
})
export const addFaqAction = (data) => { 
    return dispatch => {
        dispatch(addFaqRequest())
       // const FormData = data.formData

        const FormData = {
            specializations:data.formData.specializations,
            order:data.formData.order,
            clinicId:data.formData.clinicId,
            clinicName:data.formData.clinicName,
            file:data.formData.file,
            status: data.formData.status,
            question:{
                english:data.formData.question_english,
                hindi:data.formData.question_hindi
            },
            answer:{
                english:data.formData.answer_english,
                hindi:data.formData.answer_hindi
            }
        }
        return API.addFaq(FormData)
        .then(response => {
            dispatch(addFaqSuccess(response.data))
        })
        .catch(error => {   
            dispatch(addFaqError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/* Faq list  */
export const FaqListRequest = () => ({
    type: actionTypes.GET_FAQ_LIST_REQUEST
})
export const FaqListSuccess = (response) => ({
    type: actionTypes.GET_FAQ_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const FaqListError = (error) => ({
    type: actionTypes.GET_FAQ_LIST_ERROR,
    payload: {
        error
    }
})
export const faqListAction = (data) => {  
    return dispatch => {
        dispatch(FaqListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"question",
            direction:"desc",
            search:"",
            clinic_id:"",
            specialization_id:"",
        }
        return API.faqList(FormData)
        .then(response => {
            dispatch(FaqListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(FaqListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/* Update Faq and Add form */

export const updateFaqRequest = () => ({
    type: actionTypes.GET_UPDATE_FAQ_REQUEST
})
export const updateFaqSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_FAQ_SUCCESS,
    payload: {
        response,
    }
})
export const updateFaqError = (error) => ({
    type: actionTypes.GET_UPDATE_FAQ_ERROR,
    payload: {
        error,
    }
})
export const updateFaqAction = (data) => { 
    return dispatch => {
        dispatch(updateFaqRequest())
        const FormData = {
            specializations:data.formData.specializations,
            order:data.formData.order,
            clinicId:data.formData.clinicId,
            clinicName:data.formData.clinicName,
            file:data.formData.file,
            status: data.formData.status,
            question:{
                english:data.formData.question_english,
                hindi:data.formData.question_hindi
            },
            answer:{
                english:data.formData.answer_english,
                hindi:data.formData.answer_hindi
            },
            id:data.formData.id
        }
        return API.updateFaq(FormData)
        .then(response => {
            dispatch(updateFaqSuccess(response.data))
        })
        .catch(error => {   
            dispatch(updateFaqError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


/* Faq Status Change  */
export const FaqChangeStatusRequest = () => ({
    type: actionTypes.GET_FAQ_CHANGE_STATUS_REQUEST
})
export const FaqChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_FAQ_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const FaqChangeStatusError = (error) => ({
    type: actionTypes.GET_FAQ_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const faqchangestatusAction = (data) => {  debugger  
    console.log(data)
    return dispatch => {
        dispatch(FaqChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeFaqStatus(FormData)
        .then(response => {
            console.log(response)
            dispatch(FaqChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(FaqChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
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


