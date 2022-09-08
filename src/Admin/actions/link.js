import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/link'
/* Add Link list and Add form */
export const addLinkRequest = () => ({
    type: actionTypes.GET_ADD_LINK_REQUEST
})
export const addLinkSuccess = (response) => ({
    type: actionTypes.GET_ADD_LINK_SUCCESS,
    payload: {
        response,
    }
})
export const addLinkError = (error) => ({
    type: actionTypes.GET_ADD_LINK_ERROR,
    payload: {
        error,
    }
})
export const addLinkAction = (data) => { 
    return dispatch => {
        dispatch(addLinkRequest())
        const FormData = data.formData
        return API.addLink(FormData)
        .then(response => { 
            console.log(response)
            dispatch(addLinkSuccess(response.data))
        })
        .catch(error => {   
            dispatch(addLinkError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/* Update Link list and Add form */
export const updateLinkRequest = () => ({
    type: actionTypes.GET_UPDATE_LINK_REQUEST
})
export const updateLinkSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_LINK_SUCCESS,
    payload: {
        response,
    }
})
export const updateLinkError = (error) => ({
    type: actionTypes.GET_UPDATE_LINK_ERROR,
    payload: {
        error,
    }
})
export const updateLinkAction = (data) => { 
    return dispatch => {
        dispatch(updateLinkRequest())
        const FormData = data.formData
        return API.updateLink(FormData)
        .then(response => { 
            console.log(response)
            dispatch(updateLinkSuccess(response.data))
        })
        .catch(error => {   
            dispatch(updateLinkError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/* Link list  */
export const LinkListRequest = () => ({
    type: actionTypes.GET_LINK_LIST_REQUEST
})
export const LinkListSuccess = (response) => ({
    type: actionTypes.GET_LINK_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const LinkListError = (error) => ({
    type: actionTypes.GET_LINK_LIST_ERROR,
    payload: {
        error
    }
})
export const linkListAction = (data) => {    
    return dispatch => {
        dispatch(LinkListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc",
        }
        return API.linkList(FormData)
        .then(response => { 
            dispatch(LinkListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(LinkListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/* Link Status Change  */
export const LinkChangeStatusRequest = () => ({
    type: actionTypes.GET_LINK_CHANGE_STATUS_REQUEST
})
export const LinkChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_LINK_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const LinkChangeStatusError = (error) => ({
    type: actionTypes.GET_LINK_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const linkchangestatusAction = (data) => {  debugger  
    console.log(data)
    return dispatch => {
        dispatch(LinkChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeLinkStatus(FormData)
        .then(response => {
            console.log(response)
            dispatch(LinkChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(LinkChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
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


