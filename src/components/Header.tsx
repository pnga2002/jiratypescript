import { Avatar, Dropdown, Space } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../App'
import { ACCESS_TOKEN, settings, USER_LOGIN } from '../util/config'
const Header = () => {
    const items = [
        {
            key: '1',
            label: (
                <div>
                    <NavLink to='/profile' className='navlink' style={{ textDecoration: 'none' }}>
                        Profile
                    </NavLink>

                </div>
            ),

        },
        {
            key: '2',
            label: (
                <div style={{ width: 200 }}>
                    <NavLink to='/' className='navlink' style={{ textDecoration: 'none' }}>
                        User Managerment
                    </NavLink>
                </div>
            ),
        },

        {
            key: '3',
            label: (
                <div>
                    <a className='navlink' style={{ textDecoration: 'none' }}
                        onClick={() => {
                            settings.clearStorage(ACCESS_TOKEN);
                            settings.clearStorage(USER_LOGIN);
                            history.push(`/login`);
                            window.location.reload();
                        }}
                    >
                        Log out
                    </a>

                </div>
            ),
        },
    ];

  return ( 
    <header className="header sticky sticky--top js-header">
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <NavLink to='' className='pe-4'><img src='../assets/img/shiba.png' alt='...' className='jira-logo' style={{ borderRadius: '100rem', width: '50px', height: '50px' }}></img></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                        <li className="nav-item dropdown activee">
                            <NavLink className="nav-link" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Project
                            </NavLink>
                            <ul className="dropdown-menu" style={{ width: '260px' }}>
                                <li><NavLink  className="dropdown-item" to='/'>View all projects</NavLink></li>
                                <li><NavLink  className="dropdown-item" to="/createProject">Create project</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><NavLink  className="dropdown-item" to="#">View all user</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink to='' className="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Create task</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex">
                    <Dropdown
                                menu={{ items }}
                                className='px-2'
                                trigger={['click']}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar
                                            style={{ borderRadius: '100rem', width: '35px', height: '35px' }}
                                            className="shape-avatar me-1"
                                            shape="square"
                                            size={40}
                                            src={settings.getStorageJson(USER_LOGIN)?.avatar}
                                        ></Avatar>
                                    </Space>
                                </a>
                            </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header