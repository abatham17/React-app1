import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/clinic'


//-- Subscription List
export const clinicSubscriptionRequest = () => ({
    type: actionTypes.GET_CLINIC_SUBSCRIPTION_REQUEST
})
export const clinicSubscriptionSuccess = (response) => ({
    type: actionTypes.GET_CLINIC_SUBSCRIPTION_SUCCESS,
    payload: {
        response,
    }
})
export const clinicSubscriptionError = (error) => ({
    type: actionTypes.GET_CLINIC_SUBSCRIPTION_ERROR,
    payload: {
        error
    }
})
export const clinicSubscriptionAction = (data) => {
    return dispatch => {
        dispatch(clinicSubscriptionRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.clinicSubscription(FormData)
        .then(response => {
            dispatch(clinicSubscriptionSuccess(response.data))
        })
        .catch(error => {
            dispatch(clinicSubscriptionError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Add subscription
export const addClinicSubscriptionRequest = () => ({
    type: actionTypes.POST_ADD_CLINIC_SUBSCRIPTION_REQUEST
})
export const addClinicSubscriptionSuccess = (response) => ({
    type: actionTypes.GET_ADD_CLINIC_SUBSCRIPTION_SUCCESS,
    payload: {
        response,
    }
})
export const addClinicSubscriptionError = (error) => ({
    type: actionTypes.GET_ADD_CLINIC_SUBSCRIPTION_ERROR,
    payload: {
        error
    }
})
export const addClinicSubscriptionAction = (data) => {
  return dispatch => {
      dispatch(addClinicSubscriptionRequest())


      return API.addClinicSubscription({"clinic_name":data.formData.clinic_name,
                                        "clinic_id":data.formData.clinic_id,
                                        "plan_id":data.formData.plan_id})
      .then(response => {
          dispatch(addClinicSubscriptionSuccess(response.data))
      })
      .catch(error => {
          dispatch(addClinicSubscriptionError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
      })
  }
}

/* Link Status Change  */
export const SubscriptionChangeStatusRequest = () => ({
    type: actionTypes.GET_SUBSCRIPTION_CHANGE_STATUS_REQUEST
})
export const SubscriptionChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_SUBSCRIPTION_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const SubscriptionChangeStatusError = (error) => ({
    type: actionTypes.GET_SUBSCRIPTION_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const subscriptionchangestatusAction = (data) => {  debugger  
    console.log(data)
    return dispatch => {
        dispatch(SubscriptionChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeSubscriptionStatus(FormData)
        .then(response => {
            console.log(response)
            dispatch(SubscriptionChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(SubscriptionChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

