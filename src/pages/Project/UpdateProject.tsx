import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { createProjectApi, editProjectApi, getAllProjectApi, getProjectDetailApi } from '../../redux/reducers/projectReducer'
import { Breadcrumb } from 'antd'
import { Editor } from '@tinymce/tinymce-react'
import { DispatchType, RootState } from '../../redux/config-store'
import { history } from '../../App'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const UpdateProject = () => {
    const { id } = useParams();
    const dispatch:DispatchType = useDispatch();
    const { projectDetail } = useSelector((state:RootState) => state.productReducer)

    const [projectName, setProjectName] = useState<string>()
    const [description, setDescription] = useState<string>('')
    const [categoryId, setCategoryId] = useState<string>('')

    useEffect(()=>{
        dispatch(getProjectDetailApi(Number(id)))
    },[id])

    
    const handleEditorChange = (content: any, editor: any) => {
        console.log(content)
        setDescription(content)
      }
    const handleSubmit=()=>{
        const action:any ={
            id:Number(id),
            projectName:projectName,
            description:description,
            categoryId:categoryId
        }
        console.log(action)
        dispatch(editProjectApi(Number(id),action))
        dispatch(getAllProjectApi())
        history.push('/')
    }
    
  return (
    <div className='container' style={{maxWidth:'900px'}}>
        <Breadcrumb>
            <Breadcrumb.Item>
            <a href="/">Project</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create project</Breadcrumb.Item>
        </Breadcrumb>
        <h3>New Project</h3>
        <form  className="form-card p-5 bg-light" onSubmit={handleSubmit} >
            <div className="form-group mb-3">
                <label  className="form-label">Project id <span className='text-danger'>*</span></label>
                <input disabled name='projectId' required  className="form-control" defaultValue={projectDetail?.id}  placeholder="Project id"/>
            </div>
            <div className="form-group mb-3">
                <label  className="form-label">Project name <span className='text-danger'>*</span></label>
                <input name='projectName' required  className="form-control" defaultValue={projectDetail?.projectName}  placeholder="Project name" onChange={e=>{setProjectName(e.target.value)}}/>
            </div>
                <div className="mb-3">
                    <label className="form-label" >Project category <span className="text-danger">*</span></label>
                    <select name='categoryId' className="form-select" aria-label="Default select example" defaultValue={categoryId} onChange={e=>{setCategoryId(e.target.value)}}>
                        <option value="1" >Dự án web</option>
                        <option value="2">Dự án phần mềm</option>
                        <option value="3">Dự án di động</option>
                    </select>
                </div>
                <div>

                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Descrition</label>
                        
                    <Editor 
                        apiKey='gzd8t3qd2hvhzh2yzg4gerpdggkgeqc4rwl9qsi3s4e4zq6s'
                        onEditorChange={handleEditorChange}
                        initialValue={projectDetail?.description}
                        init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        
                    />
                </div>
            <button className="btn btn-primary btn-lg mt-3" > Update </button>
           
        </form> 
    </div>
  )
}

export default UpdateProject