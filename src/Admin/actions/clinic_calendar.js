import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/clinic_calendar'


//-- List
export const clinicCalendarListRequest = () => ({
    type: actionTypes.GET_CLINIC_CALENDAR_LIST_REQUEST
})
export const clinicCalendarListSuccess = (response) => ({
    type: actionTypes.GET_CLINIC_CALENDAR_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const clinicCalendarListError = (error) => ({
    type: actionTypes.GET_CLINIC_CALENDAR_LIST_ERROR,
    payload: {
        error
    }
})
export const clinicCalendarListAction = (data) => {
    return dispatch => {
        dispatch(clinicCalendarListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"clinicName",
            direction:"asc"
        }
        return API.clinicCalendarList(FormData)
        .then(response => {
            dispatch(clinicCalendarListSuccess(response.data))
        })
        .catch(error => {
            dispatch(clinicCalendarListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//--Add ClinicCalendar
export const addClinicCalendarRequest = () => ({
    type: actionTypes.POST_ADD_CLINIC_CALENDAR_REQUEST
})
export const addClinicCalendarSuccess = (response) => ({
    type: actionTypes.GET_ADD_CLINIC_CALENDAR_SUCCESS,
    payload: {
        response,
    }
})
export const addClinicCalendarError = (error) => ({
    type: actionTypes.GET_ADD_CLINIC_CALENDAR_ERROR,
    payload: {
        error
    }
})
export const addClinicCalendarAction = (data) => {
    return dispatch => {

        dispatch(addClinicCalendarRequest())
        const formData = {
          clinic_name:data.formData.clinic_name,
          clinic_id:data.formData.clinic_id,
          message:data.formData.message,
          type:data.formData.type,
          calendar_date:data.formData.calendar_date,
        }

        return API.addClinicCalendar(formData)
        .then(response => {
            dispatch(addClinicCalendarSuccess(response.data))
        })
        .catch(error => {
            dispatch(addClinicCalendarError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

/* calendar Status Change  */
export const CalendarChangeStatusRequest = () => ({
    type: actionTypes.GET_CALENDAR_CHANGE_STATUS_REQUEST
})
export const CalendarChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_CALENDAR_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const CalendarChangeStatusError = (error) => ({
    type: actionTypes.GET_CALENDAR_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const calendarchangestatusAction = (data) => {  
    return dispatch => {
        dispatch(CalendarChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeCalendarStatus(FormData)
        .then(response => {
            console.log(response)
            dispatch(CalendarChangeStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(CalendarChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
