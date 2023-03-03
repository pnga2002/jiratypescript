import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { createProjectApi } from '../../redux/reducers/projectReducer'
import { Breadcrumb } from 'antd'
import { Editor } from '@tinymce/tinymce-react'
import { DispatchType } from '../../redux/config-store'
import { history } from '../../App'


const CreateProject = () => {
    const dispatch:DispatchType = useDispatch();
    const [projectName, setProjectName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [categoryId, setCategoryId] = useState<string>('')
    const handleEditorChange = (content: any, editor: any) => {
        console.log(content)
        setDescription(content)
      };
    const handleSubmit=()=>{
        const action ={
            projectName:projectName,
            description:description,
            categoryId:categoryId,
            alias:''
        }
        console.log(action)
        dispatch(createProjectApi(action))
        history.push('/')
    }
  return (
    <div className='container' style={{maxWidth:'900px'}}>
        <Breadcrumb>
            <Breadcrumb.Item>
            <a href="/project">Project</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create project</Breadcrumb.Item>
        </Breadcrumb>
        <h3>New Project</h3>
        <form  className="form-card p-5 bg-light" onSubmit={handleSubmit} >
            
            <div className="form-group mb-3">
                <label  className="form-label">Project name <span className='text-danger'>*</span></label>
                <input name='projectName' required  className="form-control"  placeholder="Project name" onChange={e=>{setProjectName(e.target.value)}}/>
            </div>
                <div className="mb-3">
                    <label className="form-label" >Project category <span className="text-danger">*</span></label>
                    <select name='categoryId' className="form-select" aria-label="Default select example" onChange={e=>{setCategoryId(e.target.value)}}>
                        <option value="1">Du an web</option>
                        <option value="2">Du an phan mem</option>
                        <option value="3">Du an di dong</option>
                    </select>
                </div>
                <div>

                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Descrition</label>
                        
                    <Editor 
                        apiKey='gzd8t3qd2hvhzh2yzg4gerpdggkgeqc4rwl9qsi3s4e4zq6s'
                        onEditorChange={handleEditorChange}
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
            <button className="btn btn-primary btn-lg mt-3" > Create </button>
        </form>
    </div>
  )
}

export default CreateProject