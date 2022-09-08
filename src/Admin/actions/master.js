import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/master'
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
// Add Plan
export const addPlanRequest = () => ({
    type: actionTypes.POST_ADD_PLAN_REQUEST
})
export const addPlanSuccess = (response) => ({
    type: actionTypes.GET_ADD_PLAN_SUCCESS,
    payload: {
        response,
    }
})
export const addPlanError = (error) => ({
    type: actionTypes.GET_ADD_PLAN_ERROR,
    payload: {
        error
    }
})

export const addPlanAction = (data) => {
    return dispatch => {
        dispatch(addPlanRequest())
        const FormData = {
            plan:data.formData.plan_name,
            amount:data.formData.amount,
            duration:data.formData.duration,
            status:data.formData.status,
        }
        return API.addPlan(FormData)
        .then(response => {

            dispatch(addPlanSuccess(response.data))
        })
        .catch(error => {
            dispatch(addPlanError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

// Update Plan
export const updatePlanRequest = () => ({
    type: actionTypes.POST_UPDATE_PLAN_REQUEST
})
export const updatePlanSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_PLAN_SUCCESS,
    payload: {
        response,
    }
})
export const updatePlanError = (error) => ({
    type: actionTypes.GET_UPDATE_PLAN_ERROR,
    payload: {
        error
    }
})

export const updatePlanAction = (data) => {
    return dispatch => {
        dispatch(updatePlanRequest())
        const FormData = {
            plan:data.formData.plan_name,
            amount:data.formData.amount,
            duration:data.formData.duration,
            status:data.formData.status,
            id:data.formData.id,
        }
        return API.updatePlan(FormData)
        .then(response => {

            dispatch(updatePlanSuccess(response.data))
        })
        .catch(error => {
            dispatch(updatePlanError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


/*  Plan Status Change  */
export const PlanChangeStatusRequest = () => ({
    type: actionTypes.GET_PLAN_CHANGE_STATUS_REQUEST
})
export const PlanChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_PLAN_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const PlanChangeStatusError = (error) => ({
    type: actionTypes.GET_PLAN_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const planchangestatusAction = (data) => { 
    return dispatch => {
        dispatch(PlanChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changePlanStatus(FormData)
        .then(response => {
            dispatch(PlanChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(PlanChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}




//Add Knowledge
export const addKnowledgeRequest = () => ({
    type: actionTypes.GET_ADD_KNOWLEDGE_REQUEST
})
export const addKnowledgeSuccess = (response) => ({
    type: actionTypes.GET_ADD_KNOWLEDGE_SUCCESS,
    payload: {
        response,
    }
})
export const addKnowledgeError = (error) => ({
    type: actionTypes.GET_ADD_KNOWLEDGE_ERROR,
    payload: {
        error
    }
})

export const addKnowledgeAction = (data) => { 

    return dispatch => {
        dispatch(addKnowledgeRequest())
        let formData =  data.formData;   
        return API.addKnowledge(formData)

        .then(response => { 
            dispatch(addKnowledgeSuccess(response.data))
        })
        .catch(error => { 

            dispatch(addKnowledgeError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



//Update Knowledge
export const updateKnowledgeRequest = () => ({
    type: actionTypes.GET_UPDATE_KNOWLEDGE_REQUEST
})
export const updateKnowledgeSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_KNOWLEDGE_SUCCESS,
    payload: {
        response,
    }
})
export const updateKnowledgeError = (error) => ({
    type: actionTypes.GET_UPDATE_KNOWLEDGE_ERROR,
    payload: {
        error
    }
})

export const updateKnowledgeAction = (data) => { 
debugger
    return dispatch => {
        dispatch(updateKnowledgeRequest())
        let formData =  data.formData;   
        return API.updateKnowledge(formData)

        .then(response => { 
            dispatch(updateKnowledgeSuccess(response.data))
        })
        .catch(error => { 

            dispatch(updateKnowledgeError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/*  Knowledge Status Change  */
export const KnowledgeChangeStatusRequest = () => ({
    type: actionTypes.GET_KNOWLEDGE_CHANGE_STATUS_REQUEST
})
export const KnowledgeChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_KNOWLEDGE_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const KnowledgeChangeStatusError = (error) => ({
    type: actionTypes.GET_KNOWLEDGE_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const knowledgechangestatusAction = (data) => { 
    return dispatch => {
        dispatch(KnowledgeChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeKnowledgeStatus(FormData)
        .then(response => {
            dispatch(KnowledgeChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(KnowledgeChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
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


//Update Term & Condition
export const updateTermconditionRequest = () => ({
    type: actionTypes.GET_UPDATE_TERMCONDITION_REQUEST
})
export const updateTermconditionSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_TERMCONDITION_SUCCESS,
    payload: {
        response,
    }
})
export const updateTermconditionError = (error) => ({
    type: actionTypes.GET_UPDATE_TERMCONDITION_ERROR,
    payload: {
        error
    }
})

export const updateTermconditionAction = (data) => { 
    debugger
    return dispatch => {
        dispatch(updateTermconditionRequest())
        let formData =  data;   
        return API.updateTermcondition(formData)
        .then(response => { 
            dispatch(updateTermconditionSuccess(response.data))
            console.log(response.data);
        })
        .catch(error => { 

            dispatch(updateTermconditionError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//Termcondition List
export const termconditionListRequest = () => ({
    type: actionTypes.GET_TERMCONDITION_LIST_REQUEST
})
export const termconditionListSuccess = (response) => ({
    type: actionTypes.GET_TERMCONDITION_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const termconditionListError = (error) => ({
    type: actionTypes.GET_TERMCONDITION_LIST_ERROR,
    payload: {
        error
    }
})

export const termconditionListAction = (data) => {
    return dispatch => {
        dispatch(termconditionListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.termconditionList(FormData)
        .then(response => {

            dispatch(termconditionListSuccess(response.data))
        })
        .catch(error => {
            dispatch(categoryListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

