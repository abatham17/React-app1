import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [],
  
  message: '',
  isCountryList:false,
  isCountryListError: false,
  countryList: false,

  isStateList:false,
  isStateListError: false,
  stateList: false,

  isPlanList:false,
  isPlanListError: false,
  planList: false,

  isKnowledgeList:false,
  isKnowledgeListError: false,
  KnowledgeList: false,

  isUploadFile:false,
  isUploadFileError: false,
  uploadFile: false,

  isCategoryList:false,
  isCategoryListError: false,
  categoryList: false,

  isAddTask: false,
  isAddTaskError: false,
  AddTask: false,

  isMultiUploadFile: false,
  isMultiUploadFileError: false,
  MultiUploadFile: false,

  isUserList: false,
  isUserListError: false,
  UserList: false,

  isChatUserList: false,
  isChatUserListError: false,
  ChatUserList: false,

  isGetPatientChat: false,
  isGetPatientChatError: false,
  GetPatientChat: false,

  isSpecialization: false,
  isSpecializationError: false,
  SpecializationList: false,

  isChangeStatus: false,
  isChangeStatusError: false,
  ChangeStatus: false,

  isGetChatCount: false,
  isGetChatCountError: false,
  GetChatCount: false,

  isReadChat: false,
  isReadChatError: false,
  ReadChat: false,
}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_COUNTRY_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isCountryList: false,
        isCountryListError: false,
      }
    case actionTypes.GET_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        message: 'Country List successfully',
        countryList: action.payload.response,
        isCountryList: true,
        isCountryListError: false,
      }
    case actionTypes.GET_COUNTRY_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isCountryList: false,
        isCountryListError: true
      }

    case actionTypes.GET_STATE_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isStateList: false,
        isStateListError: false,
      }
    case actionTypes.GET_STATE_LIST_SUCCESS:
      return {
        ...state,
        message: 'Country List successfully',
        stateList: action.payload.response,
        isStateList: true,
        isStateListError: false,
      }
    case actionTypes.GET_STATE_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isStateList: false,
        isStateListError: true
      }
    //Knowledge List
    case actionTypes.GET_KNOWLEDGE_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isKnowledgeList: false,
        isKnowledgeListError: false,
      }
    case actionTypes.GET_KNOWLEDGE_LIST_SUCCESS:
      return {
        ...state,
        message: 'Knowledge Listed successfully',
        KnowledgeList: action.payload.response,
        isKnowledgeList: true,
        isKnowledgeListError: false,
      }
    case actionTypes.GET_KNOWLEDGE_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isKnowledgeList: false,
        isKnowledgeListError: true
      }
    //Plan
    case actionTypes.GET_PLAN_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isPlanList: false,
        isPlanListError: false,
      }
    case actionTypes.GET_PLAN_LIST_SUCCESS:
      return {
        ...state,
        message: 'Plan List successfully',
        planList: action.payload.response,
        isPlanList: true,
        isPlanListError: false,
      }
    case actionTypes.GET_PLAN_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isPlanList: false,
        isPlanListError: true
      }
    //Upload file
    case actionTypes.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        message: '',
        isUploadFile: false,
        isUploadFileError: false,
      }
    case actionTypes.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        message: 'File Uploaded',
        uploadFile: action.payload.response,
        isUploadFile: true,
        isUploadFileError: false,
      }
    case actionTypes.UPLOAD_FILE_ERROR:
      return {
        ...state,
        uploadFile: action.payload.error,
        message: action.payload.error,
        isUploadFile: false,
        isUploadFileError: true
      }
    // category list
    case actionTypes.GET_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isCategoryList: false,
        isCategoryListError: false,
      }
    case actionTypes.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        message: 'Plan List successfully',
        categoryList: action.payload.response,
        isCategoryList: true,
        isCategoryListError: false,
      }
    case actionTypes.GET_CATEGORY_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isCategoryList: false,
        isCategoryListError: true
      }
    // Treatment with Types
    case actionTypes.GET_TREATMENT_WITH_TYPES_REQUEST:
      return {
        ...state,
        message: '',
        isTreatementList: false,
        isTreatementListError: false,
      }
    case actionTypes.GET_TREATMENT_WITH_TYPES_SUCCESS:
      return {
        ...state,
        message: 'Treatment List successfully',
        treatmentWithTypeList: action.payload.response,
        isTreatementList: true,
        isTreatementListError: false,
      }
    case actionTypes.GET_TREATMENT_WITH_TYPES_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isTreatementList: false,
        isTreatementListError: true
      }
    // Unit list
    case actionTypes.GET_UNIT_LIST_REQUEST:
    return {
      ...state,
      message: '',
      isUnitList: false,
      isUnitListError: false,
    }
    case actionTypes.GET_UNIT_LIST_SUCCESS:
    return {
      ...state,
      message: 'Unit List successfully',
      unitList: action.payload.response,
      isUnitList: true,
      isUnitListError: false,
    }
    case actionTypes.GET_UNIT_LIST_ERROR:
    return {
      ...state,
      response: action.payload.error,
      message: action.payload.error,
      isUnitList: false,
      isUnitListError: true
    }
    // Time list
    case actionTypes.GET_TIME_LIST_REQUEST:
    return {
      ...state,
      message: '',
      isTimeList: false,
      isTimeListError: false,
    }
    case actionTypes.GET_TIME_LIST_SUCCESS:
    return {
      ...state,
      message: 'Time List successfully',
      timeList: action.payload.response,
      isTimeList: true,
      isTimeListError: false,
    }
    case actionTypes.GET_TIME_LIST_ERROR:
    return {
      ...state,
      response: action.payload.error,
      message: action.payload.error,
      isTimeList: false,
      isTimeListError: true
    }
      // ADD TASK ERROR
    case actionTypes.ADD_TASK_REQUEST:
      return {
        ...state,
        message: '',
        isAddTask: false,
        isAddTaskError: false,
      }
    case actionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        message: 'Task added successfully',
        AddTask: action.payload.response,
        isAddTask: true,
        isAddTaskError: false,
      }
    case actionTypes.ADD_TASK_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddTask: false,
        isAddTaskError: true
      }

    //Multi Upload file
    case actionTypes.UPLOAD_MULTIFILE_REQUEST:
      return {
        ...state,
        message: '',
        isMultiUploadFile: false,
        isMultiUploadFileError: false,
      }
    case actionTypes.UPLOAD_MULTIFILE_SUCCESS:
      return {
        ...state,
        message: 'Files Uploaded',
        MultiUploadFile: action.payload.response,
        isMultiUploadFile: true,
        isMultiUploadFileError: false,
      }
    case actionTypes.UPLOAD_MULTIFILE_ERROR:
      return {
        ...state,
        uploadFile: action.payload.error,
        message: action.payload.error,
        isMultiUploadFile: false,
        isMultiUploadFileError: true
      }  

    case actionTypes.GET_USER_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isUserList: false,
        isUserListError: false,
      }
    case actionTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        message: 'User List successfully',
        UserList: action.payload.response,
        isUserList: true,
        isUserListError: false,
      }
    case actionTypes.GET_USER_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUserList: false,
        isUserListError: true
      }   

    case actionTypes.CHAT_USER_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isChatUserList: false,
        isChatUserListError: false,
      }
    case actionTypes.CHAT_USER_LIST_SUCCESS:
      return {
        ...state,
        message: 'Chat User List successfully',
        ChatUserList: action.payload.response,
        isChatUserList: true,
        isChatUserListError: false,
      }
    case actionTypes.CHAT_USER_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isChatUserList: false,
        isChatUserListError: true
      }  

    case actionTypes.GET_PATIENT_CHAT_REQUEST:
      return {
        ...state,
        message: '',
        isGetPatientChat: false,
        isGetPatientChatError: false,
      }
    case actionTypes.GET_PATIENT_CHAT_SUCCESS:
      return {
        ...state,
        message: 'Get Patient Chat successfully',
        GetPatientChat: action.payload.response,
        isGetPatientChat: true,
        isGetPatientChatError: false,
      }
    case actionTypes.GET_PATIENT_CHAT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isGetPatientChat: false,
        isGetPatientChatError: true
      }  

    case actionTypes.GET_SPECIALIZATIONS_REQUEST:
      return {
        ...state,
        message: '',
        isSpecialization: false,
        isSpecializationError: false,
      }
    case actionTypes.GET_SPECIALIZATIONS_SUCCESS:
      return {
        ...state,
        SpecializationList: action.payload.response,
        isSpecialization: true,
        isSpecializationError: false,
      }
    case actionTypes.GET_SPECIALIZATIONS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isSpecialization: false,
        isSpecializationError: true
      } 

    case actionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateUser: false,
        isUpdateUserError: false,
      }
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        UpdateUser: action.payload.response,
        isUpdateUser: true,
        isUpdateUserError: false,
      }
    case actionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateUser: false,
        isUpdateUserError: true
      }

    case actionTypes.CHANGE_USER_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isChangeStatus: false,
        isChangeStatusError: false,
      }
    case actionTypes.CHANGE_USER_STATUS_SUCCESS:
      return {
        ...state,
        ChangeStatus: action.payload.response,
        isChangeStatus: true,
        isChangeStatusError: false,
      }
    case actionTypes.CHANGE_USER_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isChangeStatus: false,
        isChangeStatusError: true
      }

    case actionTypes.FORWARD_CHAT_REQUEST:
      return {
        ...state,
        message: '',
        isChatForward: false,
        isChatForwardError: false,
      }
    case actionTypes.FORWARD_CHAT_SUCCESS:
      return {
        ...state,
        ChatForward: action.payload.response,
        isChatForward: true,
        isChatForwardError: false,
      }
    case actionTypes.FORWARD_CHAT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isChatForward: false,
        isChatForwardError: true
      } 

    case actionTypes.GET_CHAT_COUNT_REQUEST:
      return {
        ...state,
        message: '',
        isGetChatCount: false,
        isGetChatCountError: false,
      }
    case actionTypes.GET_CHAT_COUNT_SUCCESS:
      return {
        ...state,
        GetChatCount: action.payload.response,
        isGetChatCount: true,
        isGetChatCountError: false,
      }
    case actionTypes.GET_CHAT_COUNT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isGetChatCount: false,
        isGetChatCountError: true
      }   

    case actionTypes.READ_CHAT_REQUEST:
      return {
        ...state,
        message: '',
        isReadChat: false,
        isReadChatError: false,
      }
    case actionTypes.READ_CHAT_SUCCESS:
      return {
        ...state,
        ReadChat: action.payload.response,
        isReadChat: true,
        isReadChatError: false,
      }
    case actionTypes.READ_CHAT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isReadChat: false,
        isReadChatError: true
      }  
    default:
    return state
  }
}
