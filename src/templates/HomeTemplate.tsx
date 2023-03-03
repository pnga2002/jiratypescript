import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const HomeTemplate = () => {
  return (
    <div>
        <Header/>
        
        <Outlet/>
    </div>
  )
}

export default HomeTemplate