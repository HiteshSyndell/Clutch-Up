import React from 'react'
import { supabase } from "./supabaseClient";
import { useHistory } from 'react-router-dom';
const Home = () => {
  let history=useHistory()

  const loginout = async () => {
    const { error } = await supabase.auth.signOut()
    console.log(error);
    history.push({
      pathname: "/Mainlogin/",
    });
  }
  return (
    <>
      <div className="landingRow col-12" >
                  <div className="nevbarbutton p-0">

                    <button className="nevbarlogbutton m-0" onClick={() => loginout()}>
                      Logout
                    </button>
                  </div>
                </div> 
    </>
  )
}

export default Home
