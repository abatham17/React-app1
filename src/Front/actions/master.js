import * as actionTypes from './actionTypes'
import * as API from 'Front/api/master'
//Country
export const countryListRequest = () => ({
    type: actionTypes.GET_COUNTRY_LIST_REQUEST
})
export const countryListSuccess = (response) => ({
    type: actionTypes.GET_COUNTRY_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const countryListError = (error) => ({
    type: actionTypes.GET_COUNTRY_LIST_ERROR,
    payload: {
        error
    }
})

export const countryListAction = (data) => {
    return dispatch => {
        dispatch(countryListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.countryList(FormData)
        .then(response => {

            dispatch(countryListSuccess(response.data))
        })
        .catch(error => {
            dispatch(countryListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
//State
export const stateListRequest = () => ({
    type: actionTypes.GET_STATE_LIST_REQUEST
})
export const stateListSuccess = (response) => ({
    type: actionTypes.GET_STATE_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const stateListError = (error) => ({
    type: actionTypes.GET_STATE_LIST_ERROR,
    payload: {
        error
    }
})
export const stateListAction = (data) => {
    return dispatch => {
        dispatch(stateListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc",
            countryId:data
        }
        return API.stateList(FormData)
        .then(response => {
            dispatch(stateListSuccess(response.data))
        })
        .catch(error => {
            dispatch(stateListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
//plans
export const planListRequest = () => ({
    type: actionTypes.GET_PLAN_LIST_REQUEST
})
export const planListSuccess = (response) => ({
    type: actionTypes.GET_PLAN_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const planListError = (error) => ({
    type: actionTypes.GET_PLAN_LIST_ERROR,
    payload: {
        error
    }
})

export const planListAction = (data) => {
    return dispatch => {
        dispatch(planListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.planList(FormData)
        .then(response => {

            dispatch(planListSuccess(response.data))
        })
        .catch(error => {
            dispatch(planListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Knowledge List
export const KnowledgeListRequest = () => ({
    type: actionTypes.GET_KNOWLEDGE_LIST_REQUEST
})
export const KnowledgeListSuccess = (response) => ({
    type: actionTypes.GET_KNOWLEDGE_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const KnowledgeListError = (error) => ({
    type: actionTypes.GET_KNOWLEDGE_LIST_ERROR,
    payload: {
        error
    }
})
export const knowledgeListAction = (data) => {
    return dispatch => {
        dispatch(KnowledgeListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.knowledgeList(FormData)
        .then(response => {
            dispatch(KnowledgeListSuccess(response.data))
        })
        .catch(error => {
            dispatch(KnowledgeListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 
//Upload File
export const uploadFileRequest = () => ({
    type: actionTypes.UPLOAD_FILE_REQUEST
})
export const uploadFileSuccess = (response) => ({
    type: actionTypes.UPLOAD_FILE_SUCCESS,
    payload: {
        response,
    }
})
export const uploadFileError = (error) => ({
    type: actionTypes.UPLOAD_FILE_ERROR,
    payload: {
        error
    }
})
export const uploadFileAction = (data) => {
    return dispatch => {
        dispatch(uploadFileRequest())  
   
        let formData = new FormData();
        formData.append('file',data.faqfile);
        return API.uploadFile(formData)
        .then(response => {
            dispatch(uploadFileSuccess(response.data))
        })
        .catch(error => {
            dispatch(uploadFileError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



//Category List
export const categoryListRequest = () => ({
    type: actionTypes.GET_CATEGORY_LIST_REQUEST
})
export const categoryListSuccess = (response) => ({
    type: actionTypes.GET_CATEGORY_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const categoryListError = (error) => ({
    type: actionTypes.GET_CATEGORY_LIST_ERROR,
    payload: {
        error
    }
})

export const categoryListAction = (data) => {
    return dispatch => {
        dispatch(categoryListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.categoryList(FormData)
        .then(response => {

            dispatch(categoryListSuccess(response.data))
        })
        .catch(error => {
            dispatch(categoryListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Treatment with types
export const treatmentWithTypesRequest = () => ({
    type: actionTypes.GET_TREATMENT_WITH_TYPES_REQUEST
})
export const treatmentWithTypesSuccess = (response) => ({
    type: actionTypes.GET_TREATMENT_WITH_TYPES_SUCCESS,
    payload: {
        response,
    }
})
export const treatmentWithTypesError = (error) => ({
    type: actionTypes.GET_TREATMENT_WITH_TYPES_ERROR,
    payload: {
        error
    }
})

export const treatmentWithTypesAction = () => {
    return dispatch => {
        dispatch(treatmentWithTypesRequest())

        const FormData = {}

        return API.treatmentWithType(FormData)
        .then(response => { 

            dispatch(treatmentWithTypesSuccess(response.data))
        })
        .catch(error => {
            dispatch(treatmentWithTypesError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Unit list
export const unitListRequest = () => ({
    type: actionTypes.GET_UNIT_LIST_REQUEST
})
export const unitListSuccess = (response) => ({
    type: actionTypes.GET_UNIT_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const unitListError = (error) => ({
    type: actionTypes.GET_UNIT_LIST_ERROR,
    payload: {
        error
    }
})

export const unitListAction = () => {
    return dispatch => {
        dispatch(unitListRequest())

        const FormData = {}

        return API.unitList(FormData)
        .then(response => {

            dispatch(unitListSuccess(response.data))
        })
        .catch(error => {
            dispatch(unitListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Time list
export const timeListRequest = () => ({
    type: actionTypes.GET_TIME_LIST_REQUEST
})
export const timeListSuccess = (response) => ({
    type: actionTypes.GET_TIME_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const timeListError = (error) => ({
    type: actionTypes.GET_TIME_LIST_ERROR,
    payload: {
        error
    }
})

export const timeListAction = () => {
    return dispatch => {
        dispatch(timeListRequest())

        const FormData = {}

        return API.timeList(FormData)
        .then(response => {

            dispatch(timeListSuccess(response.data))
        })
        .catch(error => {
            dispatch(timeListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//add Task
export const addTaskRequest = () => ({
    type: actionTypes.ADD_TASK_REQUEST
})
export const addTaskSuccess = (response) => ({
    type: actionTypes.ADD_TASK_SUCCESS,
    payload: {
        response,
    }
})
export const addTaskError = (error) => ({
    type: actionTypes.ADD_TASK_ERROR,
    payload: {
        error
    }
})

export const addTaskAction = (data) => { 
    return dispatch => {
        dispatch(addTaskRequest())
        
        return API.addTask(data)
        .then(response => {

            dispatch(addTaskSuccess(response.data))
        })
        .catch(error => {
            dispatch(addTaskError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//Multi Upload File
export const uploadMultiFileRequest = () => ({
    type: actionTypes.UPLOAD_MULTIFILE_REQUEST
})
export const uploadMultiFileSuccess = (response) => ({
    type: actionTypes.UPLOAD_MULTIFILE_SUCCESS,
    payload: {
        response,
    }
})
export const uploadMultiFileError = (error) => ({
    type: actionTypes.UPLOAD_MULTIFILE_ERROR,
    payload: {
        error
    }
})
export const uploadMultiFileAction = (data) => {
    return dispatch => {
        dispatch(uploadMultiFileRequest())  
   
        let formData = new FormData();
        for(let x in data){
            formData.append('file',data[x]);
        }        
        return API.uploadMultiFile(formData)
        .then(response => {
            dispatch(uploadMultiFileSuccess(response.data))
        })
        .catch(error => {
            dispatch(uploadMultiFileError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//User List
export const userListRequest = () => ({
    type: actionTypes.GET_USER_LIST_REQUEST
})
export const userListSuccess = (response) => ({
    type: actionTypes.GET_USER_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const userListError = (error) => ({
    type: actionTypes.GET_USER_LIST_ERROR,
    payload: {
        error
    }
})

export const userListAction = (data) => {
    return dispatch => {
        dispatch(userListRequest())
        const FormData = {
            limit:1000,
            offset:0,
            order:"userName",
            direction:"asc"
        }
        return API.userList(FormData)
        .then(response => {

            dispatch(userListSuccess(response.data))
        })
        .catch(error => {
            dispatch(userListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//Chat User List
export const chatUserListRequest = () => ({
    type: actionTypes.CHAT_USER_LIST_REQUEST
})
export const chatUserListSuccess = (response) => ({
    type: actionTypes.CHAT_USER_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const chatUserListError = (error) => ({
    type: actionTypes.CHAT_USER_LIST_ERROR,
    payload: {
        error
    }
})

export const chatUserListAction = (data) => {
    return dispatch => {
        dispatch(chatUserListRequest())
        
        return API.chatUserList(data)
        .then(response => {
            dispatch(chatUserListSuccess(response.data))
        })
        .catch(error => {
            dispatch(chatUserListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//get Patient Chat
export const getPatientChatRequest = () => ({
    type: actionTypes.GET_PATIENT_CHAT_REQUEST
})
export const getPatientChatSuccess = (response) => ({
    type: actionTypes.GET_PATIENT_CHAT_SUCCESS,
    payload: {
        response,
    }
})
export const getPatientChatError = (error) => ({
    type: actionTypes.GET_PATIENT_CHAT_ERROR,
    payload: {
        error
    }
})

export const getPatientChatAction = (data) => {
    return dispatch => {
        dispatch(getPatientChatRequest())
        
        return API.getPatientChat(data)
        .then(response => {
            dispatch(getPatientChatSuccess(response.data))
        })
        .catch(error => {
            dispatch(getPatientChatError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



//get Specialization
export const getSpecializationsRequest = () => ({
    type: actionTypes.GET_SPECIALIZATIONS_REQUEST
})
export const getSpecializationsSuccess = (response) => ({
    type: actionTypes.GET_SPECIALIZATIONS_SUCCESS,
    payload: {
        response,
    }
})
export const getSpecializationsError = (error) => ({
    type: actionTypes.GET_SPECIALIZATIONS_ERROR,
    payload: {
        error
    }
})

export const getSpecializationsAction = (data) => {
    return dispatch => {
        dispatch(getSpecializationsRequest())
        
        return API.getSpecializations(data)
        .then(response => {
            dispatch(getSpecializationsSuccess(response.data))
        })
        .catch(error => {
            dispatch(getSpecializationsError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



//Update User
export const updateUserRequest = () => ({
    type: actionTypes.UPDATE_USER_REQUEST
})
export const updateUserSuccess = (response) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: {
        response,
    }
})
export const updateUserError = (error) => ({
    type: actionTypes.UPDATE_USER_ERROR,
    payload: {
        error
    }
})

export const updateUserAction = (data) => {
    return dispatch => {
        dispatch(updateUserRequest())
        
        return API.updateUser(data)
        .then(response => {
            dispatch(updateUserSuccess(response.data))
        })
        .catch(error => {
            dispatch(updateUserError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//change User Status
export const changeUserStatusRequest = () => ({
    type: actionTypes.CHANGE_USER_STATUS_REQUEST
})
export const changeUserStatusSuccess = (response) => ({
    type: actionTypes.CHANGE_USER_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const changeUserStatusError = (error) => ({
    type: actionTypes.CHANGE_USER_STATUS_ERROR,
    payload: {
        error
    }
})

export const changeUserStatusAction = (data) => {
    return dispatch => {
        dispatch(changeUserStatusRequest())
        
        return API.changeUserStatus(data)
        .then(response => {
            dispatch(changeUserStatusSuccess(response.data))
        })
        .catch(error => {
            dispatch(changeUserStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//forward Chat
export const forwardChatRequest = () => ({
    type: actionTypes.FORWARD_CHAT_REQUEST
})
export const forwardChatSuccess = (response) => ({
    type: actionTypes.FORWARD_CHAT_SUCCESS,
    payload: {
        response,
    }
})
export const forwardChatError = (error) => ({
    type: actionTypes.FORWARD_CHAT_ERROR,
    payload: {
        error
    }
})

export const forwardChatAction = (data) => {
    return dispatch => {
        dispatch(forwardChatRequest())
        
        return API.forwardChat(data)
        .then(response => {
            dispatch(forwardChatSuccess(response.data))
        })
        .catch(error => {
            dispatch(forwardChatError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



//get Specialization
export const getChatCountRequest = () => ({
    type: actionTypes.GET_CHAT_COUNT_REQUEST
})
export const getChatCountSuccess = (response) => ({
    type: actionTypes.GET_CHAT_COUNT_SUCCESS,
    payload: {
        response,
    }
})
export const getChatCountError = (error) => ({
    type: actionTypes.GET_CHAT_COUNT_ERROR,
    payload: {
        error
    }
})

export const getChatCountAction = (data) => {
    return dispatch => {
        dispatch(getChatCountRequest())
        
        return API.getChatCount(data)
        .then(response => {
            dispatch(getChatCountSuccess(response.data))
        })
        .catch(error => {
            dispatch(getChatCountError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//read Chat
export const readChatRequest = () => ({
    type: actionTypes.READ_CHAT_REQUEST
})
export const readChatSuccess = (response) => ({
    type: actionTypes.READ_CHAT_SUCCESS,
    payload: {
        response,
    }
})
export const readChatError = (error) => ({
    type: actionTypes.READ_CHAT_ERROR,
    payload: {
        error
    }
})

export const readChatAction = (data) => {
    return dispatch => {
        dispatch(readChatRequest())
        
        return API.readChat(data)
        .then(response => {
            dispatch(readChatSuccess(response.data))
        })
        .catch(error => {
            dispatch(readChatError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}