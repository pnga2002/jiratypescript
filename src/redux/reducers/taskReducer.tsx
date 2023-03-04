import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { history } from '../../App';
import { FormUpdate, ProjectDetail, ProjectModel } from '../../interface/product';
import { ArrPriority, ArrStatus, ArrTypeTask, ArrUserByProjectId } from '../../interface/task';
import { http } from '../../util/config';
import { DispatchType } from '../config-store';


interface IinitialState {

    arrStatus:ArrStatus[],
    arrTypeTask:ArrTypeTask[],
    arrPriority: ArrPriority[],
    arrUserByProjectId:ArrUserByProjectId[]
  }
const initialState:IinitialState = {
    arrStatus:[],
    arrTypeTask:[],
    arrPriority:[],
    arrUserByProjectId:[]
}
const taskReducer = createSlice({
  name: 'taskReducer',
  initialState,
  reducers: {
    getStatusAction: (state:IinitialState, action:PayloadAction<ArrStatus[]>) => {
        state.arrStatus = action.payload;
    },
    getTypeTaskAction: (state:IinitialState, action:PayloadAction<ArrTypeTask[]>) => {
        state.arrTypeTask = action.payload;
    },
    getPriorityAction: (state:IinitialState, action:PayloadAction<ArrPriority[]>) => {
        state.arrPriority = action.payload;
    },
    getUserByProjectIdAction: (state:IinitialState, action:PayloadAction<ArrUserByProjectId[]>)=>{
        state.arrUserByProjectId = action.payload
    }
  }
});

export const { getStatusAction, getTypeTaskAction, getPriorityAction, getUserByProjectIdAction } = taskReducer.actions

export default taskReducer.reducer

export const getAllStatusApi = () => {
    return async (dispatch:DispatchType) => {
        const result:AxiosResponse = await http.get("/api/Status/getAll");
        const action = getStatusAction(result.data.content);
        dispatch(action)
    }
}
export const getPriorityApi = () => {
    return async (dispatch:DispatchType)  => {
        const result:AxiosResponse = await http.get("/api/Priority/getAll");
        const action = getPriorityAction(result.data.content);
        dispatch(action)
    }
}
export const getTaskTypeApi = () => {
    return async (dispatch:DispatchType)  => {
        const result:AxiosResponse = await http.get("/api/TaskType/getAll");
        const action = getTypeTaskAction(result.data.content);
        dispatch(action)
    }
}
export const getUserByProjectIdApi = (projectID:any) => {
    return async (dispatch:DispatchType) => {
        try {
            const result:AxiosResponse = await http.get(`/api/Users/getUserByProjectId?idProject=${projectID}`)
            const action = getUserByProjectIdAction(result.data.content);
            dispatch(action)
        } catch {
            dispatch(getUserByProjectIdAction([]))
        }

    }
}

export const createTaskApi = (newTask:any) => {
    return async (dispatch:DispatchType) => {
        try {
            const result:AxiosResponse = await http.post('/api/Project/createTask', newTask)
            message.success(`${result.data.message}`)
            history.push('/')
        } catch(err) {
            console.log(err)
        }
    }
}