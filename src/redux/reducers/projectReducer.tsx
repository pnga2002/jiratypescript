import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { FormUpdate, ProjectModel } from '../../interface/product';
import { http } from '../../util/config';
import { DispatchType } from '../config-store';


interface IinitialState {
    allProject:ProjectModel[]|null
  }
const initialState = {
    allProject : []
}
const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    getAllProjectAction: (state:IinitialState,action:PayloadAction<ProjectModel[]>) =>{
        state.allProject = action.payload
      },
  }
});

export const { getAllProjectAction } = productReducer.actions

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


