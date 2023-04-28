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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function () {
  let lagname;
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  console.log(location);
  const [LeagueName, setLeagueName] = useState("");
  const [allradyLink, setallradyLink] = useState(false);
  const [blankinput, setBlankinput] = useState(false);
  const [blankinputss, setBlankinputss] = useState(false);
  // const [teamCodelength, setTeamCodelength] = useState(false);
  const [alreadyexists, setAlreadyexists] = useState(false);
  const [Leagenames, setLeagenames] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [Startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [currentdate, setCurrentDate] = useState("");
  const [StartdetVel, setStartdetVel] = useState(false);
  const [EnddateVel, setEnddateVel] = useState(false);
  const email = location.state;
  
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
    getCurrentDate();
  }, []);
  const addWeeksToDate = (dateObj,numberOfWeeks) => {
    dateObj.setDate(dateObj.getDate()+ numberOfWeeks * 7);
    return dateObj;
  }
function getCurrentDate() {
  
  var today = moment(new Date()).format('yyyy-MM-DDThh:mm');
  console.log(moment(today).format('yyyy-MM-DD'+'T'+'h:mm'));
  //console.log(format(today, 'MM/dd/yyyy h:mm aa'));
  console.log(new Date().toISOString());

  console.log(today);
  //var dataval = format(today, 'dd/MM/yyyy h:mm aa');
  setStartDate(today);
  setEndDate(today);
}
    // ======================= date & time =========================
    // const getCurrentDate = () => {
  

  
    // };
  console.log("start",Startdate);
  // ------------------------------------- password show & hide ---------------------------
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  // const passwordhandleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  // const handleTeamcode = async (e) => {
  //   const { value } = e.target.value;
  //   setTeamCode(e.target.value);
  // };
  const handlestartdate = async (event) => {
    //const { value } = date;
    setStartDate(event.target.value);
    var today = moment(new Date()).format('yyyy-MM-DDThh:mm');
    setEndDate(today);
    setCurrentDate(event.target.value);
  };
  const handleenddate = async (event) => {
    //const { value } = date;
    setEndDate(event.target.value);
  };


  const CreateLeague = async () => {
    // -------------------------------------validation of league name-----------------------------------------
    if (LeagueName.trim().length === 0) {
      setBlankinput(true);
      setBlankinputss(true);
      // setTeamCodelength(false);
    } else {
      setBlankinput(false);
      setBlankinputss(false);
      if(Startdate.trim().length === 0){
        setStartdetVel(true);
      }else{
        setStartdetVel(false);
        if(enddate.trim().length === 0){
          setEnddateVel(true);
        }else{
          setEnddateVel(false);
          const { data, error } = await supabase
          .from("admintournament")
          .select();
       
          
        if (data.length !== 0) {
          setTeamCode(true);
          setAlreadyexists(true);
        } else {
          setTeamCode(false);
          setAlreadyexists(false);
    
            console.log("tournamentstartdate",Startdate);
            console.log("tournamentenddate",enddate);
            
        
            const { data, error } = await supabase
              .from("admintournament")
              .insert({
                tournamentname : LeagueName,
                email : email, 
                tournamentstartdate : Startdate,
                tournamentenddate : enddate,
                createdby:'admin'
              }).select();
            console.log(error);
  
       
            const teamCodeAndName = {
              LeagueName: LeagueName,
              email : email,
              
            };
  
    
            history.push({
              pathname: "/adminpanel/",
              state: teamCodeAndName,
            });
        }
      }
      
 
      }
      }
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
                      value={Startdate}
                      min={Startdate}
                      onChange={handlestartdate}
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
           
                  {/* <div className="lableintext">
                   <label >Start date</label> 
                  <DatePicker className="dateinputs" 
                  selected={Startdate} 
                  minDate={new Date()} showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={20}
                  timeCaption="time"
                  dateFormat="dd/MM/yyyy h:mm aa"
                   onSelect={handlestartdate} 
                   onChange={handlestartdate} />
                  </div> */}
                  <div className="user-input-wrp">
                    <br />
                    <input
                      value={enddate}
                      min={currentdate}
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
                  {/* <div className="lableintext">
                   <label >End date</label> 
                  <DatePicker className="dateinputs" 
                  selected={enddate} 
                  minDate={new Date() } showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={20}
                  timeCaption="time"
                  dateFormat="dd/MM/yyyy h:mm aa"
                 onSelect={handleenddate} 
                 onChange={handleenddate} />
                  </div> */}
                  {teamCode && (
                      <small className="d-block mb-2 red errors">
                       Admin Tournament Already Created.
                      </small>
                    )}
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
