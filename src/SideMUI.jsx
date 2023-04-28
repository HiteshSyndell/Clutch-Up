import React from 'react'
import { Children } from 'react'
import { Link } from 'react-router-dom'

const SideMUI = () => {
  return (
    <>
    <div className="container-fluid">
      <div className="row d-flex">
        <div className="col-lg-4 col-md-4 col-sm-4  shadow" style={{backgroundColor:"gray",width:"20vw",height:"100vh"}}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0  d-flex flex-column align-content-center mt-5">
        <li className="nav-item bg-light mb-2">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item bg-light mb-2">
          <Link className="nav-link" to="/demo/">Playerlist</Link>
        </li>
        <li className="nav-item bg-light mb-2">
          <Link className="nav-link" to="/tour/">Tournamentlist</Link>
        </li>
        <li className="nav-item bg-light mb-2">
          <Link className="nav-link" href="#">Link</Link>
        </li>
        <li className="nav-item bg-light mb-2">
          <Link className="nav-link" href="#">Link</Link>
        </li>
        <li className="nav-item bg-light mb-2">
          <Link className="nav-link" href="#">Link</Link>
        </li>
        <li className="nav-item bg-light mb-2">
          <Link className="nav-link" href="#">Link</Link>
        </li>
        </ul>
        </div>
        {/* {Children} */}
        <div className="col-lg-8 col-md-8 col-sm-8   shadow" style={{backgroundColor:"blue",width:"80%",height:"10vh"}}>
        <h1>header</h1>
    </div> 
      </div>
      </div>
    </>
  )
}

export default SideMUI
