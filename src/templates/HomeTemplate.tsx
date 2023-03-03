import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import CreateTask from '../pages/CreateTask/CreateTask'

const HomeTemplate = () => {
  return (
    <div>
        <Header/>
        <CreateTask/>
        <Outlet/>
    </div>
  )
}

export default HomeTemplate