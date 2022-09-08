import * as actionTypes from './actionTypes'
import * as API from 'Front/api/settings'

//Add Faq
export const addFaqRequest = () => ({
    type: actionTypes.ADD_FAQ_REQUEST
})
export const addFaqSuccess = (response) => ({
    type: actionTypes.ADD_FAQ_SUCCESS,
    payload: {
        response,
    }
})
export const addFaqError = (error) => ({
    type: actionTypes.ADD_FAQ_ERROR,
    payload: {
        error
    }
})
export const addFaqAction = (data) => {
    return dispatch => {
        dispatch(addFaqRequest())  
   
        return API.addFaq(data)
        .then(response => {
            dispatch(addFaqSuccess(response.data))
        })
        .catch(error => {
            dispatch(addFaqError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Add Knowledge
export const addKnowledgeRequest = () => ({
    type: actionTypes.ADD_KNOWLEDGE_REQUEST
})
export const addKnowledgeSuccess = (response) => ({
    type: actionTypes.ADD_KNOWLEDGE_SUCCESS,
    payload: {
        response,
    }
})
export const addKnowledgeError = (error) => ({
    type: actionTypes.ADD_KNOWLEDGE_ERROR,
    payload: {
        error
    }
})
export const addKnowledgeAction = (data) => {
    return dispatch => {
        dispatch(addKnowledgeRequest())  
   
        return API.addKnowledge(data)
        .then(response => {
            dispatch(addKnowledgeSuccess(response.data))
        })
        .catch(error => {
            dispatch(addKnowledgeError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//Add Clinic Link
export const addClinicLinkRequest = () => ({
    type: actionTypes.ADD_CLINIC_LINK_REQUEST
})
export const addClinicLinkSuccess = (response) => ({
    type: actionTypes.ADD_CLINIC_LINK_SUCCESS,
    payload: {
        response,
    }
})
export const addClinicLinkError = (error) => ({
    type: actionTypes.ADD_CLINIC_LINK_ERROR,
    payload: {
        error
    }
})
export const addClinicLinkAction = (data) => {
    return dispatch => {
        dispatch(addClinicLinkRequest())  
   
        return API.addClinicLink(data)
        .then(response => {
            dispatch(addClinicLinkSuccess(response.data))
        })
        .catch(error => {
            dispatch(addClinicLinkError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//add Educator Message 
export const addEducatorMessageRequest = () => ({
    type: actionTypes.ADD_EDUCATOR_MSG_REQUEST
})
export const addEducatorMessageSuccess = (response) => ({
    type: actionTypes.ADD_EDUCATOR_MSG_SUCCESS,
    payload: {
        response,
    }
})
export const addEducatorMessageError = (error) => ({
    type: actionTypes.ADD_EDUCATOR_MSG_ERROR,
    payload: {
        error
    }
})
export const addEducatorMessageAction = (data) => {
    return dispatch => {
        dispatch(addEducatorMessageRequest())  
   
        return API.addEducatorMessage(data)
        .then(response => {
            dispatch(addEducatorMessageSuccess(response.data))
        })
        .catch(error => {
            dispatch(addEducatorMessageError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Change Password 
export const changePasswordRequest = () => ({
    type: actionTypes.CHANGE_PASSWORD_REQUEST
})
export const changePasswordSuccess = (response) => ({
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: {
        response,
    }
})
export const changePasswordError = (error) => ({
    type: actionTypes.CHANGE_PASSWORD_ERROR,
    payload: {
        error
    }
})
export const changePasswordAction = (data) => {
    return dispatch => {
        dispatch(changePasswordRequest())  
   
        return API.changePassword(data)
        .then(response => {
            dispatch(changePasswordSuccess(response.data))
        })
        .catch(error => {
            dispatch(changePasswordError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//add Clinic Holiday
export const addClinicHolidayRequest = () => ({
    type: actionTypes.ADD_CLINIC_HOLIDAY_REQUEST
})
export const addClinicHolidaySuccess = (response) => ({
    type: actionTypes.ADD_CLINIC_HOLIDAY_SUCCESS,
    payload: {
        response,
    }
})
export const addClinicHolidayError = (error) => ({
    type: actionTypes.ADD_CLINIC_HOLIDAY_ERROR,
    payload: {
        error
    }
})
export const addClinicHolidayAction = (data) => {
    return dispatch => {
        dispatch(addClinicHolidayRequest())  
   
        return API.addClinicHoliday(data)
        .then(response => {
            dispatch(addClinicHolidaySuccess(response.data))
        })
        .catch(error => {
            dispatch(addClinicHolidayError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


