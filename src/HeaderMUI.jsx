import React from 'react'
import Sidebar from './Sidebar'
import Home from './Home'
import Tour from './Tour'

const HeaderMUI = ({Children}) => {
  return (
    <>
     <div className='d-flex'>
    <Sidebar />
    {Children}
    <Home />
     </div>
    </>
  )
}

export default HeaderMUI
