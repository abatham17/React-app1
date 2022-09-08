import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/clinic'


//-- List
export const clinicListRequest = () => ({
    type: actionTypes.GET_CLINIC_LIST_REQUEST
})
export const clinicListSuccess = (response) => ({
    type: actionTypes.GET_CLINIC_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const clinicListError = (error) => ({
    type: actionTypes.GET_CLINIC_LIST_ERROR,
    payload: {
        error
    }
})
export const clinicListAction = (data) => {
    return dispatch => {
        dispatch(clinicListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.clinicList(FormData)
        .then(response => {
            dispatch(clinicListSuccess(response.data))
        })
        .catch(error => {
            dispatch(clinicListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//--Add Clinic
export const addClinicRequest = () => ({
    type: actionTypes.POST_ADD_CLINIC_REQUEST
})
export const addClinicSuccess = (response) => ({
    type: actionTypes.GET_ADD_CLINIC_SUCCESS,
    payload: {
        response,
    }
})
export const addClinicError = (error) => ({
    type: actionTypes.GET_ADD_CLINIC_ERROR,
    payload: {
        error
    }
})
export const addClinicAction = (data) => {
    return dispatch => {

        dispatch(addClinicRequest())
        const holiday_date = data.formData.holiday_date.split(",");
        const formData = {
        clinic_name: data.formData.clinic_name,
        short_name: data.formData.short_name,
        web: data.formData.clinic_website,
        address: data.formData.address,
        city: data.formData.city,
        state: data.formData.state,
        state_id: data.formData.state_id,
        country_id: data.formData.country_id,
        country: data.formData.country,
        pin_code: data.formData.pin_code,
        phone: data.formData.phoneno,
        mobile_no: data.formData.mobile_no,
        appointmentno: data.formData.appointment_no,
        emergency: data.formData.emergency_no,
        email: data.formData.email,
        start_time: data.formData.start_time,
        end_time: data.formData.end_time,
        start_time2: data.formData.start_time2,
        end_time2: data.formData.end_time2,
        pattern: data.formData.pattern,
        is_email_facility: data.formData.email_facility,
        data_updated: data.formData.data_updated,
        status: data.formData.status,
        appointment_reminder: data.formData.appointment_notification,
        background_image: data.formData.background_image,
        contact_image: data.formData.contact_image,
        logo_image: data.formData.logo_image,
        lat: data.formData.latitude,
        long: data.formData.longitude,
        diet_print_format: data.formData.diet_print_format,
        print_header_margin: data.formData.margin_top,
        bottom_margin: data.formData.margin_bottom,
        left_margin: data.formData.margin_left,
        right_margin: data.formData.margin_right,
        week_off: data.formData.week_off,
        holiday_date: holiday_date,
        specializations: data.formData.specialization}

        return API.addClinic(formData)
        .then(response => {
            dispatch(addClinicSuccess(response.data))
        })
        .catch(error => {
            dispatch(addClinicError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



/* Clinic Status Change  */
export const ClinicChangeStatusRequest = () => ({
    type: actionTypes.GET_CLINIC_CHANGE_STATUS_REQUEST
})
export const ClinicChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_CLINIC_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const ClinicChangeStatusError = (error) => ({
    type: actionTypes.GET_CLINIC_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const clinicchangestatusAction = (data) => {
    return dispatch => {
        dispatch(ClinicChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changeClinicStatus(FormData)
        .then(response => {
            console.log(response)
            dispatch(ClinicChangeStatusSuccess(response.data))
        })
        .catch(error => {
            dispatch(ClinicChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Update CLINIC

export const updateClinicRequest = () => ({
    type: actionTypes.POST_UPDATE_CLINIC_REQUEST
})
export const updateClinicSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_CLINIC_SUCCESS,
    payload: {
        response,
    }
})


export const updateClinicError = (error) => ({
    type: actionTypes.GET_UPDATE_CLINIC_ERROR,
    payload: {
        error
    }
})


export const updateClinicAction = (data) => {
  debugger
    return dispatch => {
        dispatch(updateClinicRequest())
        
        /*const holiday_date = [];

        for(let i in data.formData.holiday_date){
            holiday_date.push(data.formData.holiday_date[i]);
        }*/

        const holiday_date = data.formData.holiday_date.split(",");

        const formData = {
          id: data.formData.id,
          sendMail: data.sendMail,
        clinic_name: data.formData.clinic_name,
        short_name: data.formData.short_name,
        web: data.formData.clinic_website,
        address: data.formData.address,
        city: data.formData.city,
        state: data.formData.state,
        state_id: data.formData.state_id,
        country_id: data.formData.country_id,
        country: data.formData.country,
        pin_code: data.formData.pin_code,
        phone: data.formData.phoneno,
        mobile_no: data.formData.mobile_no,
        appointmentno: data.formData.appointment_no,
        emergency: data.formData.emergency_no,
        email: data.formData.email,
        start_time: data.formData.start_time,
        end_time: data.formData.end_time,
        start_time2: data.formData.start_time2,
        end_time2: data.formData.end_time2,
        pattern: data.formData.pattern,
        is_email_facility: data.formData.email_facility,
        data_updated: data.formData.data_updated,
        status: data.formData.status,
        appointment_reminder: data.formData.appointment_notification,
        background_image: data.formData.background_image,
        contact_image: data.formData.contact_image,
        logo_image: data.formData.logo_image,
        lat: data.formData.latitude,
        long: data.formData.longitude,
        diet_print_format: data.formData.diet_print_format,
        print_header_margin: data.formData.margin_top,
        bottom_margin: data.formData.margin_bottom,
        top_margin: data.formData.margin_top,
        left_margin: data.formData.margin_left,
        right_margin: data.formData.margin_right,
        week_off: data.formData.week_off,
        holiday_date: holiday_date,
        specializations: data.formData.specialization}

        return API.editClinic(formData)
        .then(response => {
            debugger
            dispatch(updateClinicSuccess(response.data))
        })
        .catch(error => {
          debugger
            dispatch(updateClinicError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
