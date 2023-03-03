import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getAllProjectApi } from '../../redux/reducers/projectReducer';

import { DispatchType, RootState } from '../../redux/config-store';
import { Select } from 'antd';
import { getAllStatusApi, getPriorityApi, getTaskTypeApi } from '../../redux/reducers/taskReducer';
const CreateTask = () => {
    const dispatch:DispatchType = useDispatch();
    useEffect(() => {
        dispatch(getAllProjectApi());
        dispatch(getAllStatusApi());
        dispatch(getPriorityApi());
        dispatch(getTaskTypeApi());
        // if(state.value.projectId!==''){
        //     dispatch(getUserByProjectIdApi(state.value.projectId))

        // }
        
    }, [])
  const { allProject } = useSelector((state:RootState) => state.productReducer)
  const { arrStatus, arrPriority, arrTypeTask } = useSelector((state:RootState) => state.taskReducer)
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ marginRight: '0', maxWidth: '700px' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-dark fw-bold" id="exampleModalLabel">Create Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className=' ' style={{  width: '100%', height: '100%', widows: '100%' }}>

                                <form className="form-card px-5 " >
                                    <fieldset className="form-fieldset">
                                        {/* project */}
                                        <div className="mb-3">
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Project</label>
                                            <select name='projectId' className="form-select" aria-label="Default select example" >
                                                {allProject?.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.projectName}</option>
                                                })}
                                            </select>
                                            <span> <i>* You can only create task of your own project</i></span>
                                        </div>
                                        {/* task name */}
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Task name</label>
                                            <input required type="email" className="form-control" id="exampleFormControlInput1" placeholder="Task name" name="taskName" />
                                            <span className='text-danger'><i></i></span>
                                        </div>
                                        {/* status */}
                                        <div className="mb-3">
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Status</label>
                                            <select name='statusId' className="form-select" aria-label="Default select example" >
                                                {arrStatus.map((item, index) => {
                                                    return <option key={index} value={item.statusId}>{item.statusName}</option>
                                                })}
                                            </select>
                                        </div>
                                        {/* priorityId */}
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Priority</label>
                                                <select name='priorityId' className="form-select" aria-label="Default select example" >
                                                    {arrPriority.map((item, index) => {
                                                        return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Task type</label>
                                                <select name='typeId' className="form-select" aria-label="Default select example" >
                                                    {arrTypeTask.map((item, index) => {
                                                        return <option key={index} value={item.id}>{item.taskType}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        {/* listUserAsign */}
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Assigners</label>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                />
                                            <span></span>
                                        </div>
                                        <div className="row mb-3">

                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Time Tracking</label>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Total Estimated Hours</label>
                                                <input name="originalEstimate" type="number" step='1' min="0" max="100" className="ant-input form-control" ></input>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Hours spent</label>
                                                <input name="timeTrackingSpent" type="number" step='1' min="0" max="100" className="form-control" defaultValue={0} ></input>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="ant-slider mt-5">
                                                <div className="ant-slider-rail" />
                                                <div className="ant-slider-track" style={{ left: '0%', right: 'auto', width: '100%' }} />
                                                <div className="ant-slider-step" />
                                                <div tabIndex={0} className="ant-slider-handle" role="slider" aria-valuemin={0} aria-valuemax={5} aria-valuenow={5} aria-disabled="false" style={{ right: 'auto', transform: 'translateX(-50%)', left: '100%' }} />
                                                <div className="ant-slider-mark" />
                                            </div>
                                            <div className="justify-between mb-3">
                                                {/* <div className="text-start  fw">{state.value.timeTrackingSpent} hour(s) spent </div>
                                                <div className="text-end  font-bold"> {state.value.originalEstimate - state.value.timeTrackingSpent} hour(s) remaining</div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Descrition</label>

                                            {/* <Editor
                                                name='description'

                                                onEditorChange={handleEditorChange}
                                                apiKey='gzd8t3qd2hvhzh2yzg4gerpdggkgeqc4rwl9qsi3s4e4zq6s'
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue="<p></p>"
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
                                            /> */}
                                        </div>
                                    </fieldset>
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-dismiss="modal" >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>








    )
}

export default CreateTask