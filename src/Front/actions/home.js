import * as actionTypes from './actionTypes'
import * as API from 'Front/api/home'

//Patient Visit List
export const visitListRequest = () => ({
    type: actionTypes.GET_VISIT_LIST_REQUEST
})
export const visitListSuccess = (response) => ({
    type: actionTypes.GET_VISIT_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const visitListError = (error) => ({
    type: actionTypes.GET_VISIT_LIST_ERROR,
    payload: {
        error
    }
})
export const visitListAction = (search_date) => {    
    return dispatch => {
        dispatch(visitListRequest())
        const FormData = {
            search_date:search_date,
            search:''
        }
        return API.visitList(FormData)
        .then(response => { 
            dispatch(visitListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(visitListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


//Patient Registraction
export const patientRegistrationRequest = () => ({
    type: actionTypes.GET_PATIENT_REGISTRATION_REQUEST
})
export const patientRegistrationSuccess = (response) => ({
    type: actionTypes.GET_PATIENT_REGISTRATION_SUCCESS,
    payload: {
        response,
    }
})
export const patientRegistrationError = (error) => ({
    type: actionTypes.GET_PATIENT_REGISTRATION_ERROR,
    payload: {
        error
    }
})
export const patientRegistrationAction = (data) => {    
    return dispatch => {
        dispatch(patientRegistrationRequest())
        let formData = new FormData();
        //formData.append('patient_id', data.formData.patient_id);
        formData.append('title', data.formData.title);
        formData.append('first_name', data.formData.first_name);
        formData.append('last_name', data.formData.last_name);
        formData.append('gender', data.formData.gender);
        formData.append('height', data.formData.height);
        formData.append('weight', data.formData.weight);
        formData.append('dob', data.formData.dob);
        formData.append('age', data.formData.age);
        formData.append('email', data.formData.email);
        formData.append('city', data.formData.city);
        formData.append('remark', data.formData.remark);

        return API.patientRegistration(formData)
        .then(response => { 
            dispatch(patientRegistrationSuccess(response.data))
        })
        .catch(error => {   
            dispatch(patientRegistrationError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 



//Patient Edit
export const patientEditRequest = () => ({
    type: actionTypes.GET_PATIENT_EDIT_REQUEST
})
export const patientEditSuccess = (response) => ({
    type: actionTypes.GET_PATIENT_EDIT_SUCCESS,
    payload: {
        response,
    }
})
export const patientEditError = (error) => ({
    type: actionTypes.GET_PATIENT_EDIT_ERROR,
    payload: {
        error
    }
})

export const patientEditAction = (data) => {     

    return dispatch => {
        dispatch(patientEditRequest())


           const params = {
            id:data.formData.patientEditId,
            title:data.formData.title,
            first_name:data.formData.first_name,
            last_name:data.formData.last_name,
            gender:data.formData.gender,
            height:data.formData.height,
            weight:data.formData.weight,
            dob:data.formData.dob,
            age:data.formData.age,
            email:data.formData.email,
            city:data.formData.city,
            remark:data.formData.remark
           }

        return API.patientEdit(params)
        .then(response => { 
            dispatch(patientEditSuccess(response.data))
        })
        .catch(error => {   
            dispatch(patientEditError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


//Patient Out
export const patientOutRequest = () => ({
    type: actionTypes.GET_PATIENT_OUT_REQUEST
})
export const patientOutSuccess = (response) => ({
    type: actionTypes.GET_PATIENT_OUT_SUCCESS,
    payload: {
        response,
    }
})
export const patientOutError = (error) => ({
    type: actionTypes.GET_PATIENT_OUT_ERROR,
    payload: {
        error
    }
})
export const patientOutAction = (_id) => {    
    return dispatch => {
        dispatch(patientOutRequest())
        const formData = {
            id:_id
        }

        return API.patientOut(formData)
        .then(response => { 
            dispatch(patientOutSuccess(response.data))
        })
        .catch(error => {   
            dispatch(patientOutError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


//Next Visit Date
export const nextVisitRequest = () => ({
    type: actionTypes.GET_NEXT_VISIT_REQUEST
})
export const nextVisitSuccess = (response) => ({
    type: actionTypes.GET_NEXT_VISIT_SUCCESS,
    payload: {
        response,
    }
})
export const nextVisitError = (error) => ({
    type: actionTypes.GET_NEXT_VISIT_ERROR,
    payload: {
        error
    }
})
export const nextVisitAction = (data) => {    
    return dispatch => {
        dispatch(nextVisitRequest())
        const formData = {
            "id":data.id,
            "patient_id":data.patient_id,
            "next_visit_date":data.next_visit_date
        }

        return API.nextVisit(formData)
        .then(response => { 
            dispatch(nextVisitSuccess(response.data))
        })
        .catch(error => {   
            dispatch(nextVisitError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


//holiday list
export const holidayListRequest = () => ({
    type: actionTypes.GET_HOLIDAY_LIST_REQUEST
})
export const holidayListSuccess = (response) => ({
    type: actionTypes.GET_HOLIDAY_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const holidayListError = (error) => ({
    type: actionTypes.GET_HOLIDAY_LIST_ERROR,
    payload: {
        error
    }
})
export const holidayListAction = () => {    
    return dispatch => {
        dispatch(holidayListRequest())
        
        return API.holidayList()
        .then(response => { 
            dispatch(holidayListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(holidayListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 

//Get educator message list
export const educatorMsgListRequest = () => ({
    type: actionTypes.GET_EDUCATOR_MSG_LIST_REQUEST
})
export const educatorMsgListSuccess = (response) => ({
    type: actionTypes.GET_EDUCATOR_MSG_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const educatorMsgListError = (error) => ({
    type: actionTypes.GET_EDUCATOR_MSG_LIST_ERROR,
    payload: {
        error
    }
})
export const educatorMsgListAction = (_id) => {    
    return dispatch => {
        dispatch(educatorMsgListRequest())
        
        return API.educatorMsgList()
        .then(response => { 
            dispatch(educatorMsgListSuccess(response.data))
        })
        .catch(error => {   
            dispatch(educatorMsgListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
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


//Knowledge List
export const knowledgeListRequest = () => ({
    type: actionTypes.GET_KNOWLEDGE_LIST_REQUEST
})
export const knowledgeListSuccess = (response) => ({
    type: actionTypes.GET_KNOWLEDGE_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const knowledgeListError = (error) => ({
    type: actionTypes.GET_KNOWLEDGE_LIST_ERROR,
    payload: {
        error
    }
})

export const knowledgeListAction = (data) => {
    return dispatch => {
        dispatch(knowledgeListRequest())
        const FormData = {
            limit:1000,
            offset:0,
            order:"name",
            direction:"asc",
            search:""
        }
        return API.knowledgeList(FormData)
        .then(response => { 

            dispatch(knowledgeListSuccess(response.data))
        })
        .catch(error => {
            dispatch(knowledgeListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//Print Document
export const printShareDocumentRequest = () => ({
    type: actionTypes.PRINT_SHARE_DOCUMENT_REQUEST
})
export const printShareDocumentSuccess = (response) => ({
    type: actionTypes.PRINT_SHARE_DOCUMENT_SUCCESS,
    payload: {
        response,
    }
})
export const printShareDocumentError = (error) => ({
    type: actionTypes.PRINT_SHARE_DOCUMENT_ERROR,
    payload: {
        error
    }
})

export const printShareDocumentAction = (data) => { 
    return dispatch => {
        dispatch(printShareDocumentRequest())
        const FormData = {
            patient_id:data.patient_id,
            visit_id:data.visit_id,
            type:data.type,
            documents:data.documents,
            videos:data.type==='share'?data.videos:[]
        }
        return API.printShareDocument(FormData)
        .then(response => { 

            dispatch(printShareDocumentSuccess(response.data))
        })
        .catch(error => {
            dispatch(printShareDocumentError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



//Task List
export const taskListRequest = () => ({
    type: actionTypes.GET_TASK_LIST_REQUEST
})
export const taskListSuccess = (response) => ({
    type: actionTypes.GET_TASK_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const taskListError = (error) => ({
    type: actionTypes.GET_TASK_LIST_ERROR,
    payload: {
        error
    }
})

export const taskListAction = (data) => {  
    return dispatch => {
        dispatch(taskListRequest())
        const FormData = {
            search_date:data.created_date,
            search:'',
            patient_id:data.pId,
        }
        return API.taskList(FormData)
        .then(response => { 

            dispatch(taskListSuccess(response.data))
        })
        .catch(error => {
            dispatch(taskListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



//Document/Video And Task status change
export const changeStatusRequest = () => ({
    type: actionTypes.CHANGE_STATUS_REQUEST
})
export const changeStatusSuccess = (response) => ({
    type: actionTypes.CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const changeStatusError = (error) => ({
    type: actionTypes.CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})

export const changeStatusAction = (id, type) => { 
    return dispatch => {
        dispatch(changeStatusRequest())
        const FormData = {
            id:id,
            type:type,
        }
        return API.changeStatus(FormData)
        .then(response => { 

            dispatch(changeStatusSuccess(response.data))
        })
        .catch(error => {
            dispatch(changeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//get shared history
export const historyRequest = () => ({
    type: actionTypes.HISTORY_REQUEST
})
export const historySuccess = (response) => ({
    type: actionTypes.HISTORY_SUCCESS,
    payload: {
        response,
    }
})
export const historyError = (error) => ({
    type: actionTypes.HISTORY_ERROR,
    payload: {
        error
    }
})

export const historyAction = (id) => { 
    return dispatch => {
        dispatch(historyRequest())
        const FormData = {
            patientId:id,
        }
        return API.history(FormData)
        .then(response => { 

            dispatch(historySuccess(response.data))
        })
        .catch(error => {
            dispatch(historyError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


