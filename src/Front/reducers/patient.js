import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isPatientList:false,
  isPatientListError: false,
  patientList: false,

  isAddVisit:false,
  isAddVisitError: false,
  addVisit: false,
}

export default (state = initState, action={}) => {
  switch (action.type) {
    // Patient List
    case actionTypes.GET_PATIENT_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isPatientList: false,
        isPatientListError: false,
      }
    case actionTypes.GET_PATIENT_LIST_SUCCESS:
      return {
        ...state,
        message: 'Patient List successfully',
        patientList: action.payload.response,
        isPatientList: true,
        isPatientListError: false,
      }
    case actionTypes.GET_PATIENT_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isPatientList: false,
        isPatientListError: true
      }
// add patgient visit
    case actionTypes.GET_ADD_VISIT_REQUEST:
      return {
        ...state,
        message: '',
        isAddVisit: false,
        isAddVisitError: false,
      }
    case actionTypes.GET_ADD_VISIT_SUCCESS:
      return {
        ...state,
        message: 'Patient Visit added successfully',
        addVisit: action.payload.response,
        isAddVisit: true,
        isAddVisitError: false,
      }
    case actionTypes.GET_ADD_VISIT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddVisit: false,
        isAddVisitError: true
      }

    default:
    return state
  }
}
