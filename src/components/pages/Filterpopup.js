import React, { useState, useEffect } from "react";

function Filterpopup(props) {
    let height = props.height;
    const [minimumScore, setMinimumScore] = useState('1');
    const [maximumScore, setMaximumScore] = useState('1');
    const [minValidation, setMinValidation] = useState(false);
    const [maxvalidation, setMaxValidation] = useState(false);

    const values = {
        boolian: false,
        max: maximumScore,
        min: minimumScore,
    }
    const closebutton = () => {
        props.onClick(false);
      };

    const handleChangeOfMinScore = (e) => {
        setMinimumScore(e.target.value)
        // console.log(minimumScore);
        // if (minimumScore.length !== 0) {
        //     setMinValidation(true);
        // } else {
        //     setMinValidation(false);
        // }
    };

    const handleChangeOfMaxScore = (e) => {
        setMaximumScore(e.target.value)
        
        // if ( maximumScore !== 0) {
        //     setMaxValidation(true);
        //   return;
        // } else {
        //     setMaxValidation(false);
        // }
    };

    const handlesubmit = async () => {
        if(minimumScore.trim().length === 0 && maximumScore.trim().length === 0 ){
            setMinValidation(true);
            setMaxValidation(true);
        }else{
            if(minimumScore.trim().length !== 0){
                setMinValidation(true);
                 setMaxValidation(false);
            }else if(maximumScore.trim().length !== 0){
                setMinValidation(false);
                 setMaxValidation(true);
            }else{
                setMinValidation(false);
                 setMaxValidation(false);
            }
            props.onClick(values);
        }
        console.log(maximumScore);
     
        
    }



    return (
        <div className="editcontent" style={{ height: `${height}px` }}>
            <div className="EditfilterconfoBox">
            <div className="crosefilterbtn">
            <a className="closebutton" onClick={closebutton}>
              ×
            </a>
             </div>
                <div className="d-flex justify-content-md-between px-3">
                
                    <div className='col-6'>
                        <div className="user-input-wrp px-2">
                            <br />
                            <input
                                type="number"
                                name="num"
                                inputmode="numeric"
                                onChange={handleChangeOfMinScore}
                                value={minimumScore}
                                className="inputText"
                                required
                            />
                             {minValidation && (
                                <small className="d-block mb-1 red">
                                Please enter Minimum Score Points.
                                </small>
                                 )}
                            <span className="floating-label">Minimum Points</span>

                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="user-input-wrp px-2">
                            <br />
                            <input
                                type="number"
                                name="num" 
                                inputmode="numeric"
                                onChange={handleChangeOfMaxScore}
                                value={maximumScore}
                                className="inputText"
                                required
                            />
                              {maxvalidation && (
                                <small className="d-block mb-1 red">
                                Please enter Maximum Score Points.
                                </small>
                                 )}
                            <span className="floating-label">Maximum Points</span>

                        </div>
                    </div>
                </div>
                <div className=" px-4 mt-5">
                    <button
                        className="button "
                        type="submit"
                        name="submit"
                        value="Submit"
                        onClick={handlesubmit}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filterpopup;