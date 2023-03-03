import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AutoComplete, Avatar, Button, Input, message, Modal, Popover, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjectApi, getAllProjectSearchApi} from '../../redux/reducers/projectReducer'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { DispatchType, RootState } from '../../redux/config-store'
import { ProjectModel } from '../../interface/product'
import { ColumnsType } from 'antd/es/table'


const Project=()=> {
    
  const navigate = useNavigate();
  const dispatch:DispatchType = useDispatch()
  const { allProject } = useSelector((state:RootState) => state.productReducer)
  const { Search } = Input;
  const [value,setValue] = useState('');
  const onSearch = (value:string) => {
    dispatch(getAllProjectSearchApi(value))
  }
  const columns:ColumnsType<ProjectModel> = [
    {
      title: 'Id',
      dataIndex: 'id',
      defaultSortOrder: 'descend',
      width: 120,
      sorter: (a:ProjectModel, b:ProjectModel) => a.id - b.id,
      
    },
    {
      title: 'Project name',
      width: 250,
      sorter: (a:ProjectModel, b:ProjectModel) => a.projectName.length - b.projectName.length,
      sortDirections: ['descend'],
      render: (data:ProjectModel) => (
        <NavLink to={``}>
          {data.projectName}
        </NavLink>
      )
    },
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      width: 250,
      sorter: (a:ProjectModel, b:ProjectModel) => a.categoryName.length - b.categoryName.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Creator',
      width: 250,
      sorter: (a:ProjectModel, b:ProjectModel) => a.categoryName.length - b.categoryName.length,
      sortDirections: ['descend'],
      render: (data:ProjectModel) => (
        <>
          {data.creator.name}
        </>
      )
    },
    {
      title: 'Members',
      width: 250,
      render: (data:ProjectModel) => (
        <>
          {data.members?.map((item, index) => {
            const content = (
              <div>
                {item.name}
              </div>
            );
            return <>
              <Popover key={index} content={content}>
                <Avatar
                  style={{ borderRadius: '100rem', width: '35px', height: '35px' }}
                  className="shape-avatar me-1"
                  shape="square"
                  size={40}
                  src={`${item.avatar}`}
                ></Avatar>
              </Popover>
            </>
          })}
          {/* <Popover
                title={"Add user"}
                content={()=>{
                  return<AutoComplete 
                    options={AllUsers?.map((user)=>{
                      return {label:user.name,value:user.userId.toString()}
                    })}
                    value={value}
                    onChange={(text)=>{
                      setValue(text)
                    }}
                    onSelect={(value,option)=>{
                      setValue(option.label)
                      //goi api tra ve backend
                      let addUser ={
                        "projectId": data.id,
                        "userId": value
                      }
                      dispatch(addUserToProjectApi(addUser))
                    }}
                    style={{width:'100%'}} onSearch={(value)=>{
                    dispatch(getAllUserApi(value))
                  }}/>
                }} trigger='click'
                
              >
                <Button>+</Button>
              </Popover> */}
        </>
      )
    },
    {
      title: "Actions",
      width: 50,
      fixed: "right",
      render: (data:ProjectModel) => (
        <>
          <div className="ant-employed d-flex align-items-center justify-content-center">
            <Button style={{ fontSize: '12px', padding: '0px 15px 1px 14px', lineHeight: '14px', height: '36px' }} className="mx-2 table-action-button"  type="default" onClick={() => { navigate(`updateProject/${data.id}`); }}>
              <EditOutlined />
            </Button>
            <Button style={{ fontSize: '12px', padding: '0px 14px 1px 14px', lineHeight: '14px', height: '36px' }}  className="table-action-button">
              <DeleteOutlined style={{ color: '#e90000' }} />
            </Button>
          </div>
        </>
      ),
    },
  ];

//   const { confirm } = Modal;
//   const showDeleteConfirm = (id) => {
//     confirm({
//       title: "Delete project",
//       icon: <ExclamationCircleFilled />,
//       content: `Project Id: ${id} id deleting? `,
//       okText: "Đồng ý",
//       okType: "primary",
//       cancelText: "Không",
//       onOk() {
//         dispatch(delProjectApi(id))
//       },
//       onCancel() {
//         console.log("Hủy");
//       },
//     });
//   };

  useEffect(() => {
    dispatch(getAllProjectApi())
  }, [])



  return (
    <div className='container'>
      <div className='d-flex justify-content-between py-4'>
        <h5 className='title-page'>Projects</h5>
        <Button onClick={() => {
          navigate('/createProject')
        }}>Create project</Button>
      </div>
      <div className='search-page pb-4'>
        <Search
          placeholder="search task in here"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <div>
        <Table columns={columns} dataSource={allProject}/>;
      </div>
    </div>
  )
}
export default Project
