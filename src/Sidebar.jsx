import React from 'react'
import {Link, useHistory} from 'react-router-dom'

import Logo1 from "./images/Screenshot_1.png";
const Sidebar = () => { 
let history=useHistory()

  const service = async () => {
    history.push({
      pathname: "/demo/",
      state: teamCodeAndName,
    });
  }
  const tour = async () => {
    history.push({
      pathname: "/tour/",
      state: teamCodeAndName,
    });
  }
  const teamCodeAndName = {

    email: 'admin@gmail.com',

  };
  return (
    <>
     ''
     </>
  )
}

export default Sidebar
