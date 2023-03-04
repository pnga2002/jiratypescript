import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getAllProjectApi } from '../../redux/reducers/projectReducer';
import Select from 'react-select'

import { DispatchType, RootState } from '../../redux/config-store';
import { SelectProps, Space } from 'antd';
import { createTaskApi, getAllStatusApi, getPriorityApi, getTaskTypeApi, getUserByProjectIdApi } from '../../redux/reducers/taskReducer';
import { Option } from 'antd/es/mentions';
import { history } from '../../App';
// const { Option } = Select;
const CreateTask = () => {
    const dispatch:DispatchType = useDispatch();
   
  const { allProject } = useSelector((state:RootState) => state.productReducer)
  const { arrStatus, arrPriority, arrTypeTask, arrUserByProjectId } = useSelector((state:RootState) => state.taskReducer)
    
  const [listUserAsign, setListUserAsign] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [statusId, setstatusId] = useState('');
  const [originalEstimate, setoriginalEstimate] = useState<Number>();
  const [timeTrackingSpent, settimeTrackingSpent] = useState<Number>();
  const [timeTrackingRemaining, settimeTrackingRemaining] = useState<Number>(1);
  const [projectId, setprojectId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [priorityId, setpriorityId] = useState('');

 useEffect(() => {
        dispatch(getAllProjectApi());
        dispatch(getAllStatusApi());
        dispatch(getPriorityApi());
        dispatch(getTaskTypeApi());
        dispatch(getUserByProjectIdApi(projectId))
        

        
    }, [projectId])


    const options: SelectProps['options'] = [];
  for (let i = 0; i < arrUserByProjectId?.length; i++) {
      options.push({
          label: arrUserByProjectId[i].name,
          value: arrUserByProjectId[i].userId,
      });
  }
  const handleEditorChange = (content: any, editor: any) => {
    console.log(content)
    setDescription(content)
  };
  const showinfor=()=>{
    console.log(projectId)
    console.log(listUserAsign)
    console.log(taskName)
    console.log(priorityId)
    console.log(typeId)
    console.log(statusId)
    console.log(description)

  }
  
  const handleSubmit = () => {
    const action ={
        listUserAsign:listUserAsign,
        taskName:taskName,
        description:description,
        statusId:statusId,
        originalEstimate:originalEstimate,
        timeTrackingSpent:timeTrackingSpent,
        timeTrackingRemaining:timeTrackingRemaining,
        projectId:projectId,
        typeId:typeId,
        priorityId:priorityId
    } 
    console.log(action)
    dispatch(createTaskApi(action))
    history.push('/')


}
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
                                            <select name='projectId' className="form-select" aria-label="Default select example" onChange={e=>{setprojectId(e.target.value)}} >
                                                {allProject?.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.projectName}</option>
                                                })}
                                            </select>
                                            <span> <i>* You can only create task of your own project</i></span>
                                        </div>
                                        {/* task name */}
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Task name</label>
                                            <input required type="email" className="form-control" id="exampleFormControlInput1" placeholder="Task name" name="taskName" onChange={e=>{setTaskName(e.target.value)}}/>
                                            <span className='text-danger'><i></i></span>
                                        </div>
                                        {/* status */}
                                        <div className="mb-3">
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Status</label>
                                            <select name='statusId' className="form-select" aria-label="Default select example" onChange={e=>{setstatusId(e.target.value)}}>
                                                {arrStatus.map((item, index) => {
                                                    return <option key={index} value={item.statusId}>{item.statusName}</option>
                                                })}
                                            </select>
                                        </div>
                                        {/* priorityId */}
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Priority</label>
                                                <select name='priorityId' className="form-select" aria-label="Default select example" onChange={e=>{setpriorityId(e.target.value)}}>
                                                    {arrPriority.map((item, index) => {
                                                        return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Task type</label>
                                                <select name='typeId' className="form-select" aria-label="Default select example" onChange={e=>{setTypeId(e.target.value)}} >
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
                                                isMulti
                                                name="listUserAsign"
                                                className="react-select"
                                                classNamePrefix="select"
                                                isClearable={false}
                                                options={options}
                                                closeMenuOnSelect={true}
                                                onChange={(choice) => {
                                                }}
                                            />
                                            <span></span>
                                        </div>
                                        <div className="row mb-3">

                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Time Tracking</label>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Total Estimated Hours</label>
                                                <input name="originalEstimate" type="number" step='1' min="0" max="100" className="ant-input form-control" defaultValue={0} onChange={e=>{setoriginalEstimate(Number(e.target.value))}} ></input>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Hours spent</label>
                                                <input name="timeTrackingSpent" type="number" step='1' min="0" max="100" className="form-control" defaultValue={0}  onChange={e=>{settimeTrackingSpent(Number(e.target.value))}} ></input>
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
                                                {/* <div className="text-start  fw">{timeTrackingSpent} hour(s) spent </div>
                                                <div className="text-end  font-bold"> {originalEstimate} hour(s) remaining</div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r form-label">Descrition</label>

                                            <Editor

                                                apiKey='gzd8t3qd2hvhzh2yzg4gerpdggkgeqc4rwl9qsi3s4e4zq6s'
                                                initialValue="<p></p>"
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
                                    </fieldset>
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>








    )
}

export default CreateTask