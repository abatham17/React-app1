import * as actionTypes from './actionTypes'
import * as API from 'Front/api/diet'


//-- Diet List
export const dietListSuccess = (response) => ({
    type: actionTypes.GET_DIET_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const dietListError = (error) => ({
    type: actionTypes.GET_DIET_LIST_ERROR,
    payload: {
        error
    }
})
export const dietListAction = (filter) => {
    return dispatch => {

        return API.dietList(filter)
        .then(response => {
            let data = {
                filter:filter,
                data:response.data
            };
            dispatch(dietListSuccess(data))
        })
        .catch(error => {
            dispatch(dietListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//-- Print diet
export const printDietRequest = () => ({
    type: actionTypes.PRINT_DIET_REQUEST,
})

export const printDietSuccess = (response) => ({
    type: actionTypes.PRINT_DIET_SUCCESS,
    payload: {
        response,
    }
})
export const printDietError = (error) => ({
    type: actionTypes.PRINT_DIET_ERROR,
    payload: {
        error
    }
})
export const printDietAction = (data) => { 
    return dispatch => {
        dispatch(printDietRequest())

        let submitData = {
            patientId: data.patient.pId,
            treatmentId: data.treatmentId,
            treatmentName: data.treatmentName,
            treatmentType: data.treatmentType,
            calorie:data.selectCalorie,
            dietType:data.mealType,
            optionCount:data.dietOption,
            dietLanguage:data.dietLanguage,
            startTimeDelay:data.startTimeDelay
        };

        return API.printDiet(submitData)
        .then(response => {
            dispatch(printDietSuccess(response))
        })
        .catch(error => {
            dispatch(printDietError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}