import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [], 
  message: '',

  isAddFaq:false,
  isAddFaqError: false,
  AddFaq: false,

  isAddKnowledge: false,
  isAddKnowledgeError: false,
  AddKnowledge: false,

  isAddClinicLink: false,
  isAddClinicLinkError: false,
  AddClinicLink: false,

  isAddEducatorMsg: false,
  isAddEducatorMsgError: false,
  AddEducatorMsg: false,

  isChangePassword: false,
  isChangePasswordError: false,
  ChangePassword: false,

  isAddClinicHoliday: false,
  isAddClinicHolidayError: false,
  AddClinicHoliday: false,

}

export default (state = initState, action={}) => {
  switch (action.type) {
   
    //Upload file
    case actionTypes.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        message: '',
        isAddFaq: false,
        isAddFaqError: false,
      }
    case actionTypes.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        message: 'FAQ Added',
        uploadFile: action.payload.response,
        isAddFaq: true,
        isAddFaqError: false,
      }
    case actionTypes.UPLOAD_FILE_ERROR:
      return {
        ...state,
        AddFaq: action.payload.error,
        message: action.payload.error,
        isAddFaq: false,
        isAddFaqError: true
      }


      //Upload file
    case actionTypes.ADD_KNOWLEDGE_REQUEST:
      return {
        ...state,
        message: '',
        isAddKnowledge: false,
        isAddKnowledgeError: false,
      }
    case actionTypes.ADD_KNOWLEDGE_SUCCESS:
      return {
        ...state,
        message: 'FAQ Added',
        AddKnowledge: action.payload.response,
        isAddKnowledge: true,
        isAddKnowledgeError: false,
      }
    case actionTypes.ADD_KNOWLEDGE_ERROR:
      return {
        ...state,
        AddFaq: action.payload.error,
        message: action.payload.error,
        isAddKnowledge: false,
        isAddKnowledgeError: true
      } 

      //Upload file
    case actionTypes.ADD_CLINIC_LINK_REQUEST:
      return {
        ...state,
        message: '',
        isAddClinicLink: false,
        isAddClinicLinkError: false,
      }
    case actionTypes.ADD_CLINIC_LINK_SUCCESS:
      return {
        ...state,
        message: 'FAQ Added',
        AddClinicLink: action.payload.response,
        isAddClinicLink: true,
        isAddClinicLinkError: false,
      }
    case actionTypes.ADD_CLINIC_LINK_ERROR:
      return {
        ...state,
        AddFaq: action.payload.error,
        message: action.payload.error,
        isAddClinicLink: false,
        isAddClinicLinkError: true
      }

      //Upload file
    case actionTypes.ADD_EDUCATOR_MSG_REQUEST:
      return {
        ...state,
        message: '',
        isAddEducatorMsg: false,
        isAddEducatorMsgError: false,
      }
    case actionTypes.ADD_EDUCATOR_MSG_SUCCESS:
      return {
        ...state,
        message: 'Educator Msg Added',
        AddEducatorMsg: action.payload.response,
        isAddEducatorMsg: true,
        isAddEducatorMsgError: false,
      }
    case actionTypes.ADD_EDUCATOR_MSG_ERROR:
      return {
        ...state,
        AddFaq: action.payload.error,
        message: action.payload.error,
        isAddEducatorMsg: false,
        isAddEducatorMsgError: true
      }


      //Change Password
    case actionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        message: '',
        isChangePassword: false,
        isChangePasswordError: false,
      }
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: 'Password Changed Successfully',
        ChangePassword: action.payload.response,
        isChangePassword: true,
        isChangePasswordError: false,
      }
    case actionTypes.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        ChangePassword: action.payload.error,
        message: action.payload.error,
        isChangePassword: false,
        isChangePasswordError: true
      }

      //Change Password
    case actionTypes.ADD_CLINIC_HOLIDAY_REQUEST:
      return {
        ...state,
        message: '',
        isAddClinicHoliday: false,
        isAddClinicHolidayError: false,
      }
    case actionTypes.ADD_CLINIC_HOLIDAY_SUCCESS:
      return {
        ...state,
        message: 'Clinic holiday added successfully',
        AddClinicHoliday: action.payload.response,
        isAddClinicHoliday: true,
        isAddClinicHolidayError: false,
      }
    case actionTypes.ADD_CLINIC_HOLIDAY_ERROR:
      return {
        ...state,
        ChangePassword: action.payload.error,
        message: action.payload.error,
        isAddClinicHoliday: false,
        isAddClinicHolidayError: true
      }
   
    default:
    return state
  }
}
