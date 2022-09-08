import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/user'

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
            limit:10,
            offset:0,
            order:"_id",
            direction:"desc"
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


//-- Add User
export const AddUserRequest = () => ({
    type: actionTypes.GET_ADD_USER_REQUEST
})
export const AddUserSuccess = (response) => ({
    type: actionTypes.GET_ADD_USER_SUCCESS,
    payload: {
        response,
    }
})
export const AddUserError = (error) => ({
    type: actionTypes.GET_ADD_USER_ERROR,
    payload: {
        error
    }
})
export const addUserAction = (data) => { debugger

    return dispatch => {
        dispatch(AddUserRequest())
        console.log(data);

        const FormData = {
        user_name: data.user_name,
        email:data.email,
        password:data.password,
        confirm_password:data.confirm_password,
        group:data.group,
        clinic_id:data.clinic,
        clinic_name: data.clinic_name,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        specializations: data.specialization,
        degree: data.degree,
        photo:data.formData.file
        }
        console.log(FormData)
        return API.addUser(FormData)
        .then(response => {
            dispatch(AddUserSuccess(response.data))
        })
        .catch(error => {
            dispatch(AddUserError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

// User Update

//-- Add User
export const UpdateUserRequest = () => ({
    type: actionTypes.GET_UPDATE_USER_REQUEST
})
export const UpdateUserSuccess = (response) => ({
    type: actionTypes.GET_UPDATE_USER_SUCCESS,
    payload: {
        response,
    }
})
export const UpdateUserError = (error) => ({
    type: actionTypes.GET_UPDATE_USER_ERROR,
    payload: {
        error
    }
})
export const updateUserAction = (data) => {
       debugger
    return dispatch => {
        dispatch(UpdateUserRequest())
        console.log(data);

        const FormData = {
          id: data.user_name,
        user_name: data.user_name,
        email:data.email,
        password:data.password,
        confirm_password:data.confirm_password,
        group:data.group,
        clinic_id:data.clinic,
        clinic_name: data.clinic_name,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        specializations: data.specialization,
        degree: data.degree,
        photo:data.formData.file
        }
        console.log(FormData)
        return API.updateUser(FormData)
        .then(response => {
            dispatch(UpdateUserSuccess(response.data))
        })
        .catch(error => {
            dispatch(UpdateUserError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Get User Detail
export const userDetailRequest = () => ({
    type: actionTypes.GET_USER_DETAIL_REQUEST
})
export const userDetailSuccess = (response) => ({
    type: actionTypes.GET_USER_DETAIL_SUCCESS,
    payload: {
        response,
    }
})
export const userDetailError = (error) => ({
    type: actionTypes.GET_USER_DETAIL_ERROR,
    payload: {
        error
    }
})
export const userDetailAction = (data) => {
    return dispatch => {
        dispatch(userDetailRequest())
        const FormData = {
            id:data.id
        }
        return API.userDetail(FormData)
        .then(response => {
            dispatch(userDetailSuccess(response.data))
        })
        .catch(error => {
            dispatch(userDetailError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
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

//User status
export const userStatusRequest = () => ({
    type: actionTypes.GET_USER_STATUS_REQUEST
})
export const userStatusSuccess = (response) => ({
    type: actionTypes.GET_USER_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const userStatusError = (error) => ({
    type: actionTypes.GET_USER_STATUS_ERROR,
    payload: {
        error
    }
})
export const userStatusAction = (data) => {
    return dispatch => {
        dispatch(userStatusRequest())
        const FormData = {
            id:data.id,
            status:data.status
        }
        return API.userStatus(FormData)
        .then(response => {
            dispatch(userStatusSuccess(response.data))
        })
        .catch(error => {
            dispatch(userStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
