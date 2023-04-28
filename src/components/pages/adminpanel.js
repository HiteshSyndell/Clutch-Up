import React, { useState } from "react";
import "./Style.css";
import Logo1 from "../../images/Screenshot_1.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";
import logoimages from "../../images/logo_1.png";
import moment from "moment";
import { format } from 'date-fns';

const LandingScreen = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // ========================================= loder screen===================================
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  //  ============================================ profile pic dwonlord===========================
  useEffect(() => {
    loadData();
  }, []);
  //  var email = location.state.email;
  //   console.log('test',email);
  // =========================== supabse players shoe data =====================================
  const teamCodeAndName = {

    email: 'admin@gmail.com',

  };
  console.log(teamCodeAndName);
  const updateleague = async () => {
    history.push({
      pathname: "/edittournament/",
      state: teamCodeAndName,
    });

  }

  const loadData = async () => {
    const { data, error } = await supabase
      .from("admintournament")
      .select()
      .eq('email', 'admin@gmail.com')
    setUserData(data)
    console.log(data);
    var date = moment(data[0].tournamentstartdate).format('MM/DD/yyyy h:mm A');
    console.log(date);
  };




  // const addleague =async () =>{
  //   history.push({
  //     pathname: "/create-league/",
  //     state:email,
  //   });
  // }

  // const adminpanel =async () =>{
  //   setLoading(true);
  // setTimeout(() => {
  //   setLoading(false);
  // }, 100);
  // }
  const service = async () => {
    history.push({
      pathname: "/demo/",
      state: teamCodeAndName,
    });
  }
  const loginout = async () => {
    const { error } = await supabase.auth.signOut()
    console.log(error);
    history.push({
      pathname: "/Mainlogin/",
    });
  }
  const Newcompo = async () => {
    history.push({
      pathname: "/newcompo/",
      state: teamCodeAndName,
    });
  }
  return (
    <>
      <div className="sectionlanding" >
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <img src={logoimages} style={{ width: 100, height: 100 }} />
          </div>
        ) : (
          <div className="contenorlanding">

            <div className="contentrow col-12">
              {/* <img className="photoimagelanding" src={Logo1}  /> */}
              
              <div className="nevcolumn col-2 " >
                
                <div className="nevlogo">
                  <img className="photoimagelanding" src={Logo1} />
                </div>


                <div className="nevlistst">
                  <li className="listnevbars"><Link onClick={service} style={{ textDecoration: "none", color: "black" }}>Player List</Link></li>
                  {/* <li className="listnevbars"><Link onClick={to ur} style={{ textDecoration: "none", color: "black" }}>Tour</Link></li> */}

                </div>

                <div className="nevlistst">
                </div>

              </div>


              <div className="col-10 screensection" style={{ height: 'auto', background: "#F8F8F8" }}>
                {/* <img className="photoimagelanding" src={Logo1}  /> */}
                <div className="landingRow col-12 ">
                  <div className="nevbarbutton p-0">

                    <button className="nevbarlogbutton m-0" onClick={() => loginout()}>
                      Logout
                    </button>
                  </div>
                </div>
                <div className="landingsscreens" >
                  <div className="landing-box col-12">
                    <div className="col-12 d-flex align-items-center" style={{ height: 60 }}>
                      <div className="col-4"></div>
                      <h4 className="col-4 contenthadding haddingadmintext">Tournament List</h4>
                      <div className="col-4 adminbuttons">
                        {/* <button className="adminbutton" onClick={() => addleague()}>Add Tournament</button> */}

                      </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table className="table">
                        <tbody>
                          <tr className="border-btm col-12">

                            <th className="col-2 leagunamedata" style={{ fontSize: 13, color: "#757575", }}>{/* No. */}Tournament Name</th>
                            <th className=" col-2 teblelname "
                              style={{
                                fontSize: 13,
                                textAlign: "center",
                                color: "#757575",
                              }}
                            >
                              Start Date
                            </th>
                            <th className=" col-2 teblelname "
                              style={{
                                fontSize: 13,
                                textAlign: "right",
                                color: "#757575",
                                paddingRight: '6%'
                              }}
                            >
                              End Date
                            </th>

                          </tr>


                          {userData &&
                            userData.length === 0 ?
                            (<div style={
                              {
                                position: 'fixed',
                                right: '32%',
                                top: '50%',
                                fontSize: '32px'
                              }}>No Data Found</div>) :
                            (userData.map((user, index) => {


                              return (
                                <tr key={index} className="align-middle">
                                  <td className="col-2 leagunamedata" style={{ fontSize: 13 }}> {/* {index+1}  */}&nbsp;{user.tournamentname}</td>
                                  {/* <td className="col-2" style={{ fontSize: 13, textAlign: "center" }}>
                              {user.leaguecode}
                            </td> */}
                                  <td className="col-2 "
                                    style={{
                                      fontSize: 13,
                                      textAlign: "center"
                                    }}
                                  >
                                    {moment(user.tournamentstartdate).format('MM/DD/yyyy h:mm A')}
                                    {/* {moment(Date(user.tournamentstartdate)).format('MM/DD/yyyy h:mm A')} */}
                                  </td>
                                  <td className="col-2"
                                    style={{
                                      fontSize: 13,
                                      textAlign: "right",
                                      paddingRight: '55px'
                                    }}
                                  >
                                    {moment(user.tournamentenddate).format('MM/DD/yyyy h:mm A')}
                                    {/* <i className="fa fa-edit col-1 text-center" onClick={updateleague}></i> */}
                                  </td>

                                </tr>
                              );

                            }))}
                        </tbody>
                      </table>

                    </div>
                    {/* <button className="landingbuttonlink" onClick={viewRoster}>
                View Roster
              </button> */}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default LandingScreen;
