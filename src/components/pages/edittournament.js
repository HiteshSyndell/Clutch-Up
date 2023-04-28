import React, { useState, useEffect } from "react";
import "./Style.css";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { useHistory, useLocation } from "react-router-dom";
import Visibility from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOutlined";
import { supabase } from "../../supabaseClient";
import { format } from 'date-fns';
import moment from "moment";
//import "react-datepicker/dist/react-datepicker.css";
import { data } from "jquery";

export default function () {
  let lagname;
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  console.log(location);
  const [LeagueName, setLeagueName] = useState("");
  const [Startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [blankinput, setBlankinput] = useState(false);
  const [blankinputss, setBlankinputss] = useState(false);

  const [Updatedata, setUpdateData] = useState("");
 
  const [Startdateupdate, setStartDateUpdate] = useState("");
  const [Enddateupdate, setEndDateUpdate] = useState("");
  const [StartdetVel, setStartdetVel] = useState(false);
  const [EnddateVel, setEnddateVel] = useState(false);
  const email = location.state.email;
  
  console.log(email);
  const getLeagueName = async (e) => {
    const { value } = e.target.value;
    setLeagueName(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    //getCurrentDate();
    update();
  }, []);
  async function update(){
    const { data, error } = await supabase
    .from("admintournament")
    .select()
    .eq('email',email);
    setUpdateData(data[0].tournamentname);
    console.log(moment(data[0].tournamentstartdate).format('MM/DD/yyyy h:mm a'));
    //console.log(format(data[0].tournamentstartdate, 'dd/MM/yyyy h:mm aa'));
    setStartDateUpdate(data[0].tournamentstartdate);
   setEndDateUpdate(data[0].tournamentenddate);
    
    console.log(data);
  }
  const addWeeksToDate = (dateObj,numberOfWeeks) => {
    dateObj.setDate(dateObj.getDate()+ numberOfWeeks * 7);
    return dateObj;
  }
    // ======================= date & time =========================
    const getCurrentDate = () => {
      const numWeeks = 1;
console.log("newdate",addWeeksToDate(new Date(), numWeeks));

      var today = new Date();
 
      console.log(format(today, 'MM/dd/yyyy h:mm aa'));
      console.log(today);

      console.log(today);
      var dataval = format(today, 'dd/MM/yyyy h:mm aa');
      setStartDate('');
      setEndDate('');
  
    };
  
  // ------------------------------------- password show & hide ---------------------------

  const handleValueChange = (event) => {
    //const { value } = date;
    console.log(event.target.value);
    //console.log("dataformat",format(data, 'dd/MM/yyyy h:mm aa'));
    // setStartDateUpdate(date)
    setStartDateUpdate(event.target.value);
    
  };
  const handleenddate =  (event) => {
    //const { value } = date;
    setEndDateUpdate(event.target.value);
  };

  console.log("start",Startdateupdate);
  console.log("end",Enddateupdate);

  const CreateLeague = async () => {
    // -------------------------------------validation of league name-----------------------------------------
      //   const { data, error } = await supabase

      if(Startdateupdate.trim().length === 0){
        setStartdetVel(true);
      }else{
        setStartdetVel(false);
        if(Enddateupdate.trim().length === 0){
          setEnddateVel(true);
        }else{
          setEnddateVel(false);
          const { data, error } = await supabase
        .from("admintournament")
        .update({
          tournamentstartdate :Startdateupdate ,
          tournamentenddate :Enddateupdate,
          
        }).eq('email',email)
      console.log(data);

        
      const teamCodeAndName = {
       
        email : email,
        
      };
      history.push({
        pathname: "/adminpanel/",
        state: teamCodeAndName,
      });
        }
        

      }
      //   .from("admintournament")
      //   .select();
        
      // console.log(data);
          // console.log("tournamentstartdate",Startdate);
          // console.log("tournamentenddate",enddate);
         
  
      
      
  };

  return (
    <div className="section">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"> </div>
          <img src={logoimages} style={{ width: 100, height: 100 }} />
        </div>
      ) : (
        <div className="Row">
          <div className="col1 ">
            <img src={BackgroundImage} className="mainimg" alt="back-image" />
          </div>
          <div className="col">
            <div className="contener">
              <div className="d-box">
                <img src={logoimages} className="logo" />
                <h3 className="hading mt-0 h-50">Create Tournament</h3>
                <div className="form-outline">
                  <div className="user-input-wrp">
                    <br />
                    <input
                      value={Updatedata}
                      onChange={getLeagueName}
                      type="text"
                      className="inputText"
                      maxLength="20"
                      required
                      autoSave="off"
                      autoComplete="off"
                      aria-autocomplete="off"
                      autoFocus="off"
                      autocorrect="off"
                    />
                    <span className="floating-label">Tournament Name</span>
                    {blankinput && (
                      <small className="d-block mb-2 red errors">
                        Please Enter League name.
                      </small>
                    )}
                  </div>
                  
                  <div className="user-input-wrp">
                    <br />
                    <input
                      min={Startdateupdate}
                      value={Startdateupdate}
                      onChange={handleValueChange}
                      type="datetime-local"
                      className="inputText"
                      required
                      
                    />
                    <span className="floating-labelss">Start date</span>
                    {StartdetVel && (
                        <small className="d-block mb-1 red">
                          Please enter start date.
                        </small>
                      )}
                  </div>
                
                  <div className="user-input-wrp">
                    <br />
                    <input
                      min={Startdateupdate}
                      value={Enddateupdate}
                      onChange={handleenddate}
                      type="datetime-local"
                      className="inputText"
                      required
                      
                    />
                    <span className="floating-labelss">End date</span>
                    {EnddateVel && (
                        <small className="d-block mb-1 red">
                          Please enter End date.
                        </small>
                      )}
                  </div>
                 
                </div>
                <div className="btn2">
                  <button className="button" onClick={CreateLeague}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
