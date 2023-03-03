import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { FormUpdate, ProjectDetail, ProjectModel } from '../../interface/product';
import { ArrPriority, ArrStatus, ArrTypeTask } from '../../interface/task';
import { http } from '../../util/config';
import { DispatchType } from '../config-store';


interface IinitialState {

    arrStatus:ArrStatus[],
    arrTypeTask:ArrTypeTask[],
    arrPriority: ArrPriority[],
  }
const initialState:IinitialState = {
    arrStatus:[],
    arrTypeTask:[],
    arrPriority:[]
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
    }
  }
});

export const { getStatusAction, getTypeTaskAction, getPriorityAction } = taskReducer.actions

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