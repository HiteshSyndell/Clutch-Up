import React, { useState, useEffect } from "react";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import "./Style.css";
import ConforPsmpopup from "./ConforPsmpopup.js";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Update } from "@material-ui/icons";
import { el } from "date-fns/locale";

const Forgotscreen = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidEmails,setIsValidEmails ] = useState(false);
  
  const [conformpsPopup, setConformpsPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const userInput = {
    isEmailOk: false,
  };
  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const resetPassword = async () => {
    if (email.trim().length === 0) {
      setIsValidEmail(true);
      setIsValidEmails(false);
    } 
    else{ 
      setIsValidEmail(false);
       if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i.test(email)){
        setIsValidEmails(true);
      }
      setIsValidEmails(false);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email
        // {
        //   redirectTo: "https://clutchuappreactjs-phash-1.d1cr5nflmqclb3.amplifyapp.com/ResetPassword/",
        // }
      );
     console.log(error);
     setIsValidEmails(false);
      if (!error) {
        setIsValidEmails(false);
        setIsValidEmail(false);
        let { data, error } = await supabase
          .from('user')
          .select()
          .eq('email',email)
        console.log("file",data);
        setIsValidEmails(false);
        setIsValidEmail(false);
        if(data.length !== 0){
          setIsValidEmails(false);
          setIsValidEmail(false);
          if(data[0].email === email){
            setConformpsPopup(true);
            setIsValidEmails(false);
            setIsValidEmail(false);
          }else{
            
            setIsValidEmails(true);
          }
        }else{
          setIsValidEmails(true);
        }
        
        // history.push('/Mainlogin/')
      } else {
        // alert(error.message || error);
        setIsValidEmails(true);
      }
       setIsValidEmails(false);
    }
    // console.log(data);
    // console.log(error);
  };

  return (
    <>
      <div className="section">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <img src={logoimages} style={{ width: 100, height: 100 }} />
          </div>
        ) : (
          <div className="Row">
            <div className="col1">
              <img src={BackgroundImage} className="mainimg" alt="back-image" />
            </div>
            <div className="col">
              <div className="contener">
                <div className="d-box">
                  <img src={logoimages} className="logo" />
                  <h3 className="hading">Forgot Password</h3>
                  <div className="forgot-pass">
                    <div className="user-input-wrp">
                      <br />
                      <input
                        type="text"
                        className="inputText"
                        
                        onChange={getEmail}
                        required
                      />
                      <span className="floating-label">EMAIL</span>
                      {isValidEmail && (
                        <small
                          style={{
                            textAlign: "left",
                            marginTop: 5,
                            color: "red",
                            display: "grid",
                          }}
                        >
                          Please Enter Email Address.
                        </small>
                      )}
                       {isValidEmails && (
                        <small className="d-block mb-1 red">
                          Please enter valid email address.
                        </small>
                      )}
                    </div>
                    <div className="btn2 mt-3">
                      <button className="button" onClick={resetPassword}>
                        Submit
                      </button>
                    </div>
                  </div>
                <div className="Terms-conditions">
                  Privacy | Terms & Conditions
                </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {conformpsPopup && <ConforPsmpopup />}
    </>
  );
};

export default Forgotscreen;
