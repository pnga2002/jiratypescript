import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { history } from '../../App';
import { SignInModel, LoginModel, RegisterModel, AllUser } from '../../interface/user';
import { ACCESS_TOKEN, http, settings, USER_LOGIN } from '../../util/config';
import { DispatchType } from '../config-store';
// import bcrypt from "bcryptjs";

type UserLoginState = {
    login:SignInModel | null,
    allUser:AllUser[]
}

const initialState:UserLoginState = {
    login:null,
    allUser:[]
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        userloginAction: (state:UserLoginState, aciton:PayloadAction<SignInModel>) => {
            state.login = aciton.payload
            settings.setStorageJson(USER_LOGIN, aciton.payload)
            settings.setStorage(ACCESS_TOKEN, aciton.payload.accessToken)
            history.push('/')
        },
        getAllUserAction: (state:UserLoginState, action:PayloadAction<AllUser[]>) => {
            state.allUser = action.payload
        },
    }
});

export const { userloginAction, getAllUserAction } = userReducer.actions

export default userReducer.reducer

export const userLoginApi = (userLogin:LoginModel) => {
    return async (dispatch:DispatchType) => {
        try {
            const result:AxiosResponse = await http.post('/api/Users/signin', userLogin)
           
             dispatch(userloginAction(result.data.content))
             message.success(result.data.message)
        } catch (err) {
            // message.error(err.response.data.message)
        }
    }
}

export const userRegisterApi = (userRegister:RegisterModel) => {
    return async (dispatch:DispatchType) => {
        try {
            const result:AxiosResponse = await http.post('/api/Users/signup', userRegister)
            history.push(`/login`)
            message.warning('Enter your email and password to login')
        } catch (err) {
            console.log(err)
        }
    }
}
export const getAllUserApi = (getUser:any) => {
    return async (dispatch:DispatchType) => {
        try {
            const result = await http.get(`/api/Users/getUser?keyword=${getUser}`)
            console.log(result.data.content)
            return dispatch(getAllUserAction(result.data.content))
        } catch (err) {
            // console.log(err)
        }
    }
}
// export const editUserApi = (user) => {
//     return async dispatch => {
//         try {
//             const result = await http.put('/api/Users/editUser', user)
//             dispatch(editUserAction(result.data.content))
//             user.passWord = bcrypt.hashSync(user.passWord, 10);
//             user.confirm = bcrypt.hashSync(user.confirm, 10);
//             settings.setStorageJson(USER_LOGIN, user)
//             //có phải cái result là cái e sẽ update phải ko v cái setlocal phải là result chứ
//             message.success(result.data.message)
//         } catch (err) {
//             return
//         }
//     }
// }