import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { FormUpdate, ProjectDetail, ProjectModel } from '../../interface/product';
import { http } from '../../util/config';
import { DispatchType } from '../config-store';


interface IinitialState {

    allProject:ProjectModel[],
    projectDetail:ProjectDetail|null
  }
const initialState:IinitialState = {
    allProject : [],
    projectDetail:null
}
const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    getAllProjectAction: (state:IinitialState,action:PayloadAction<ProjectModel[]>) =>{
        state.allProject = action.payload
      },
    getProjectDetailAction: (state:IinitialState, action:PayloadAction<ProjectDetail>) => {
        state.projectDetail = action.payload
    }
  }
});

export const { getAllProjectAction, getProjectDetailAction } = productReducer.actions

export default productReducer.reducer

export const createProjectApi = (createProject:any) => {
    return async (dispatch:DispatchType) => {
        try {
            const result:AxiosResponse = await http.post('/api/Project/createProjectAuthorize', createProject)
             message.success(result.data.message)
        } catch (err) {
            message.error('Create Project Fail')
        }
    }
}
export const getAllProjectApi = () => {
    return async (dispatch:DispatchType) => {
            const res = await http.get('/api/Project/getAllProject')
            dispatch(getAllProjectAction(res.data.content))
    }
}
export const getAllProjectSearchApi = (keyword:string) => {
    return async (dispatch:DispatchType) => {
        try {
            const result = await http.get(`/api/Project/getAllProject?keyword=${keyword}`)
            dispatch(getAllProjectAction(result.data.content))
        } catch (err) {
            return dispatch(getAllProjectApi());
        }
    }
}
export const getProjectDetailApi = (id:number) => {
    return async (dispatch:DispatchType) => {
        try {
            const result = await http.get(`/api/Project/getProjectDetail?id=${id}`)
            dispatch(getProjectDetailAction(result.data.content))
        } catch (err) {
            return;
        }
    }
}
export const editProjectApi = (id:number, updateProject:FormUpdate) => {
    return async (dispatch:DispatchType)  => {
        try {
            const reuslt = await http.put(`/api/Project/updateProject?projectId=${id}`, updateProject)
            message.success(`${reuslt.data.message}`)
        } catch (err) {
            return;
        }
    }
}


