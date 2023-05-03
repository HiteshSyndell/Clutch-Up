import React, { useState, forwardRef } from "react";
import "./Style.css";
import Logo1 from "../../images/Screenshot_1.png";
import { useHistory, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";
import logoimages from "../../images/logo_1.png";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import moment from "moment";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete, Stack } from "@mui/material";
import { useRef } from "react";
import { ClassSharp } from "@material-ui/icons";
// import Select from 'react-select';

const LandingScreen = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingtable, setLoadingtable] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [allPlayer, setAllPlayer] = useState([]);
  const [allendTime, setallendTime] = useState([]);
  const [allbeginTime, setAllbeginTime] = useState([]);
  const [Playersdata, setPlayersdata] = useState([]);
  const [allData, setAllData] = useState();
  const [Playersdatas, setPlayersdatas] = useState([]);
  const [playersupdate, setPlayersUpdate] = useState([]);
  const [tornamentStartDate, setTornamentStartDate] = useState();
  const [Playerspoints, setPlayerspoints] = useState();
  const [tornamentEndDate, setTornamentEndDate] = useState();
  const [error, setError] = useState(null);
  const [myEndPoints, setmyEndPoints] = useState([]);
  const d = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[d.getDay()];

  const columns = [
    { title: "Name", field: "playername" },

    { title: "Price", field: "price" },

    { title: "Pointsearned", field: "pointsearned" },
  ];

  let count = 0;
  var teamName;
  // ========================================= loder screen===================================
  useEffect(() => {
    test();
    // updatescore()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   updatescore();
  // })
  useEffect(() => {
    getCurrentDate();
  });
  function getCurrentDate() {
    var today = moment(new Date()).format("yyyy-MM-DDThh:mm");
    // console.log(moment(today).format('yyyy-MM-DD' + 'T' + 'h:mm'));
    //console.log(format(today, 'MM/dd/yyyy h:mm aa'));
    // console.log(new Date().toISOString());

    //var dataval = format(today, 'dd/MM/yyyy h:mm aa');
    // setStartDate(today);
    // setEndDate(today);
  }

  var email = "admin@gmail.com";
  const test = async () => {
    const { data } = await supabase
      .from("playerlist")
      .select()
      .order("id", { ascending: true })
      .range(0, 50);
    setPlayersdata(data);
    //setPlayerspoints(data);
    //console.log('testing', data);
  };
  const updatescore = async () => {
    const { data } = await supabase.from("admintournament").select();
    // console.log("updatedata", data);
    setTornamentStartDate(data[0].tournamentstartdate);
    setTornamentEndDate(data[0].tournamentenddate);
    // console.log(data[0].tournamentstartdate);
  };

  const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  // console.log("tableIcons",tableIcons)
  //  ============================================ profile pic dwonlord===========================
  useEffect(async () => {
    // var myEndPoints = [];
    // let secondDayEndPoint;
    const { data } = await supabase.from("playerlist").select();
    //setPlayersUpdate(data);
    if (day === "Tuesday") {
      const { data } = await supabase.from("playerlist").select();
      var finaldata = data;
      // console.log(finaldata);
      // //setPlayersdata(finaldata);
      daysfondcall(finaldata);
    } else {
      axios("https://fortniteapi.io/v1/events/list?lang=en&region=NAE", {
        method: "GET",
        headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
      }).then((responses) => {
        // console.log(responses.data);
        // console.log("poonamtest");
        var today = moment(new Date()).format("DD/MM/yyyy");
        var date = new Date();
        var day = date.getDay();
        var prevMonday = new Date();
        // console.log("DAY",day);
        //console.log(date.getDay() == 0);
        if (date.getDay() == 0) {
          prevMonday.setDate(date.getDate() - 7);
        } else {
          //console.log(date.getDate() - (3 - day));
          prevMonday.setDate(date.getDate() - (3 - day));
        }

        // console.log('prevthursday', prevMonday);
        //console.log(prevMonday.toLocaleDateString())

        // console.log(overTomorrow);
        // var today = '27/01/2023';
        // var overTomorrow = '25/01/2023'

        responses.data.events.map(async (elems) => {
          if (elems.id === "epicgames_AlphaTournamentNA") {
            // console.log("window idsssss", elems.windows);

            var dateFrom = today;
            var dateTo = prevMonday.toLocaleDateString();
            var dateFrom = "09/04/2023";
            var dateTo = "02/04/2023";
            var d1 = dateFrom.split("/");
            var d2 = dateTo.split("/");

            var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
            var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
            // console.log('from',dateFrom)
            // console.log('to',dateTo);
            // console.log('tests');
            for (let i = 0; i < elems.windows.length; i++) {
              let elemsDateEndTime = moment(elems.windows[i].endTime).format(
                "DD/MM/yyyy"
              );
              var dateCheck = elemsDateEndTime;
              var c = dateCheck.split("/");
              var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
              // console.log(check);
              //console.log(overTomorrow <= elemsDateEndTime  && today >= elemsDateEndTime);
              //    console.log(elemsDateEndTime);
              //   console.log('todasy',dateFrom);
              //  console.log(dateTo);
              // console.log('elementdata',elemsDateEndTime);

              // console.log(dateTo <= elemsDateEndTime && dateFrom <= elemsDateEndTime);
              if (dateFrom === elemsDateEndTime) {
                // console.log("date contained");
                myEndPoints.push(elems.windows[i]);
                // console.log("id", myEndPoints);
                // setmyEndPoints(elems.windows[i]);

                //  const { deletdata, deleterror } = await supabase
                // .from("admintournament")
                // .select()
                // .eq('email','admin@gmail.com')

                const { errors } = await supabase
                  .from("admintournament")
                  .delete()
                  .eq("email", "admin@gmail.com");

                const { data, error } = await supabase
                  .from("admintournament")
                  .insert({
                    tournamentname: elems.windows[i].windowId,
                    email: "admin@gmail.com",
                    tournamentstartdate: elems.windows[i].beginTime,
                    tournamentenddate: elems.windows[i].endTime,
                    createdby: "admin",
                  })
                  .select();
              } else {
                console.log("not contained", elemsDateEndTime);
              }
              // if(overTomorrow <= elemsDateEndTime  && today >= elemsDateEndTime){
              //   console.log(elemsDateEndTime)
              // }else{
              //   console.log('F');
              // }
            }

            // console.log("sxz", myEndPoints);
            // console.log("scc", myEndPoints.length);
            //console.log("sccqa",myEndPoints.data.length);
            for (let ind = 0; ind < myEndPoints.length; ind++) {
              // console.log("qwccv", myEndPoints[ind]);
              // myEndPoints.map((endPoint) => {
              // `https://fortniteapi.io/v1/events/window?windowId=${myEndPoints[ind].windowId}`
              axios(
                `https://fortniteapi.io/v1/events/window?windowId=${myEndPoints[ind].windowId}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: "04876d40-df9ddb98-13a88349-fe7809ed",
                  },
                }
              )
                .then((response) => {
                  // console.log(response.data);
                  // Playersdatas.push({ name: name1 + " & "+ name2 , price: '5', score: response.data.session.results[index].pointsEarned })
                  // console.log("test",response.data);
                  // console.log("datawok", Playersdatas);
                  var stering = myEndPoints[ind].windowId.split("_Round");
                  // console.log("name", stering[0]);
                  // console.log(
                  //   myEndPoints[ind].windowId === stering[0] + "_Round2"
                  // );
                  if (myEndPoints[ind].windowId === stering[0] + "_Round2") {
                    // console.log("lagfh", Playersdatas.length);
                    for (
                      let index = 0;
                      index < response.data.session.results.length;
                      index++
                    ) {
                      for (
                        let i = 0;
                        i <
                        response.data.session.results[index].teamAccountNames
                          .length;
                        index++
                      ) {
                        var name1 =
                          response.data.session.results[index]
                            .teamAccountNames[0].name;
                        var name2 =
                          response.data.session.results[index]
                            .teamAccountNames[1].name;
                        var combineName = name1 + " & " + name2;
                        // console.log(combineName);
                        Playersdatas.push({
                          name: combineName,
                          price: "5",
                          score:
                            response.data.session.results[index].pointsEarned,
                        });
                        // console.log("data", Playersdatas);
                      }
                    }
                  } else {
                    for (
                      let index = 0;
                      index < response.data.session.results.length;
                      index++
                    ) {
                      for (
                        let i = 0;
                        i <
                        response.data.session.results[index].teamAccountNames
                          .length;
                        index++
                      ) {
                        var name1 =
                          response.data.session.results[index]
                            .teamAccountNames[0].name;
                        var name2 =
                          response.data.session.results[index]
                            .teamAccountNames[1].name;
                        var combineName = name1 + " & " + name2;
                        Playersdatas.push({
                          name: combineName,
                          price: "5",
                          score: "0",
                        });
                        // console.log("datavals", Playersdatas);
                      }
                    }
                  }
                  // if (Playersdatas.length <= 0) {
                  //   console.log("lagfh",Playersdatas.length);
                  //   for (let index = 0; index < response.data.session.results.length; index++) {

                  //     for (let i = 0; i < response.data.session.results[index].teamAccountNames.length; index++) {

                  //       var name1 = response.data.session.results[index].teamAccountNames[0].name;
                  //       var name2 = response.data.session.results[index].teamAccountNames[1].name;
                  //       var combineName = name1 + " & " + name2

                  //       Playersdatas.push({ name: combineName, price: '5', score: response.data.session.results[index].pointsEarned })
                  //       console.log("data", Playersdatas);
                  //     }
                  //   }

                  // } else {

                  //   for (let index = 0; index < response.data.session.results.length; index++) {

                  //     for (let i = 0; i < response.data.session.results[index].teamAccountNames.length; index++) {

                  //       var name1 = response.data.session.results[index].teamAccountNames[0].name;
                  //       var name2 = response.data.session.results[index].teamAccountNames[1].name;
                  //       var combineName = name1 + " & " + name2
                  //       Playersdatas.map((element) => {
                  //         if (element.name === combineName) {
                  //           element.score += response.data.session.results[index].pointsEarned
                  //         }
                  //       })
                  //       console.log("datavals", Playersdatas);
                  //     }
                  //   }

                  // }
                })
                .catch(setError);
              // })
            }
          }
        });
        // console.log("sxzw",myEndPoints);
        // console.log("sxz",myEndPoints);
        // console.log("scc",myEndPoints.length);
        //console.log("sccqa",myEndPoints.length);
        // for (let ind = 0; ind < myEndPoints.length; ind++) {
        //   console.log("as",myEndPoints[ind]);
        // }
        // for (let ind = 0; ind < myEndPoints.length; ind++) {
        //   console.log("as",myEndPoints[ind]);
        //   // myEndPoints.map((endPoint) => {
        //   axios(`https://fortniteapi.io/v1/events/window?windowId=${myEndPoints[ind].windowId}`, { method: 'GET', headers: { Authorization: '04876d40-df9ddb98-13a88349-fe7809ed' } })
        //     .then((response) => {
        //       // Playersdatas.push({ name: name1 + " & "+ name2 , price: '5', score: response.data.session.results[index].pointsEarned })
        //        console.log("datawok", Playersdatas);

        //       if (Playersdatas.length <= 0) {
        //         console.log("lagfh",Playersdatas.length);
        //         for (let index = 0; index < response.data.session.results.length; index++) {

        //           for (let i = 0; i < response.data.session.results[index].teamAccountNames.length; index++) {

        //             var name1 = response.data.session.results[index].teamAccountNames[0].name;
        //             var name2 = response.data.session.results[index].teamAccountNames[1].name;
        //             var combineName = name1 + " & " + name2

        //             Playersdatas.push({ name: combineName, price: '5', score: response.data.session.results[index].pointsEarned })
        //             console.log("data", Playersdatas);
        //           }
        //         }

        //       } else {

        //         for (let index = 0; index < response.data.session.results.length; index++) {

        //           for (let i = 0; i < response.data.session.results[index].teamAccountNames.length; index++) {

        //             var name1 = response.data.session.results[index].teamAccountNames[0].name;
        //             var name2 = response.data.session.results[index].teamAccountNames[1].name;
        //             var combineName = name1 + " & " + name2
        //             Playersdatas.map((element) => {
        //               if (element.name === combineName) {
        //                 element.score += response.data.session.results[index].pointsEarned
        //               }
        //             })
        //             console.log("datavals", Playersdatas);
        //           }
        //         }

        //       }

        //     }).catch(setError);
        //   // })
        // }
        //     for(let i =0; i< elems.windows.length; i++){

        //       let elemsDate = new Date(elems.windows[i].beginTime)
        //       elemsDate.setDate(elemsDate.getDate() - 1)
        // console.log(elemsDate.toLocaleDateString());

        // let elemsDateEndTime = moment(elems.windows[i].endTime).format('DD/MM/yyyy')
        // console.log(elemsDateEndTime);
        // console.log(prevMonday.toLocaleDateString() <= elemsDate.toLocaleDateString() >= today);
        // console.log(prevMonday === elemsDate.toLocaleDateString());
        //       if(prevMonday.toLocaleDateString() <= elemsDate.toLocaleDateString() >= today){
        //         fistDayEndPoint = elems.windows[i].windowId
        //         console.log('fistDayEndPoint',fistDayEndPoint);
        //       }
        //       if(overTomorrow === elemsDate.toLocaleDateString()){

        //         secondDayEndPoint = elems.windows[i].windowId
        //         console.log('secondDayEndPoint',secondDayEndPoint);
        //       }
        //     }
        //   }
        // })
        // console.log(responses.data.events[521].windows[7].beginTime);
        // console.log(responses.data.events[521].windows[7].endTime);
        // for (let index = 0; index < responses.data.events[534].windows.length;index++){
        // console.log("begindata", responses.data.events[534].windows[index].beginTime);
        //   console.log("enddata", moment(responses.data.events[534].windows[index].endTime).format('yyyy-MM-DD'));
        //   var today = moment(new Date()).format('yyyy-MM-DD');
        //   if(today === moment(responses.data.events[534].windows[index].endTime).format('yyyy-MM-DD')){
        //     tunamename = responses.data.events[534].windows[index].windowId;
        //     console.log(tunamename);
        //   }

        //    console.log(tunamename);
        // }
        // console.log(tunamename);

        //     axios(`https://fortniteapi.io/v1/events/window?windowId=${fistDayEndPoint}`, { method: 'GET', headers: { Authorization: '04876d40-df9ddb98-13a88349-fe7809ed' } })
        // .then((response) => {
        //   console.log(response);
        //   for (let index = 0; index < response.data.session.results.length; index++) {

        //     allbeginTime.push(response.data.session.results[index].teamAccountNames);
        //     const numbers = [allbeginTime[0]];

        //     for (let i = 0; i < response.data.session.results[index].teamAccountNames.length; index++) {

        //       var name1 = response.data.session.results[index].teamAccountNames[0].name;
        //       var name2 = response.data.session.results[index].teamAccountNames[1].name;
        //       Playersdatas.push({ name: name1 + " & "+ name2 , price: '5', score: response.data.session.results[index].pointsEarned })
        //       console.log("data", Playersdatas);
        //     }
        //   }
        // for (let i = 0; i < allPlayer.length; i++) {
        //   //const element = array[i];
        //   console.log("datas", allPlayer[i]);

        //   //console.log("datasq", response.data.session.results[index].teamAccountNames[i].name + response.data.session.results[index].teamAccountNames[i].name);

        // }
        // for (let index = 0; index < allPlayer.length; index++) {
        //   console.log("getid", allPlayer[index]);
        //   for (let i = 0; i < allPlayer[index].length; i++) {
        //     console.log("getidws", allPlayer[index][i]);
        //     axios(`https://fortniteapi.io/v1/stats?account=${allPlayer[index][i]}`, { method: 'GET', headers: { Authorization: '04876d40-df9ddb98-13a88349-fe7809ed' } })
        //       .then((response) => {
        //         console.log("userdata", response.data);
        //         if (response.data.result === true) {
        //           console.log("usersdata", response.data.result);
        //           console.log("userdata", response.data.name);
        //           console.log("userscore", response.data.global_stats.duo.score);
        //           Playersdatas.push({ name: response.data.name, price: '5', score: response.data.global_stats.duo.score })
        //           console.log("datsg", Playersdata);
        //         }
        //       })
        //     }

        // }
        // })
        // .catch(setError);

        // if(day === 'Friday'){
        // axios(`https://fortniteapi.io/v1/events/window?windowId=${secondDayEndPoint}`, { method: 'GET', headers: { Authorization: '04876d40-df9ddb98-13a88349-fe7809ed' } })
        // .then((response) => {
        //   console.log(response);
        //   for (let index = 0; index < response.data.session.results.length; index++) {

        //     for (let i = 0; i < response.data.session.results[index].teamAccountNames.length; index++) {

        //       var name1 = response.data.session.results[index].teamAccountNames[0].name;
        //       var name2 = response.data.session.results[index].teamAccountNames[1].name;
        //       var combineName = name1 + " & "+ name2
        //       Playersdatas.map((element) => {
        //         if(element.name === combineName){
        //           element.score += response.data.session.results[index].pointsEarned
        //         }
        //       })
        //       // Playersdatas.push({ name: name1 + " & "+ name2 , price: '5', score: response.data.session.results[index].pointsEarned })
        //       // console.log("data", Playersdatas);

        //     }

        //   }

        // })
        // .catch(setError);
        // }
      });
    }
  }, []);
  // console.log("sxzw",myEndPoints.length);
  // useEffect(async () => {
  //   console.log("sxzw",myEndPoints);
  //         console.log("sxz",myEndPoints);
  //         console.log("scc",myEndPoints.length);
  // }, []);

  var email = "admin@gmail.com";

  // =========================== supabse players shoe data =====================================
  const teamCodeAndName = {
    email: "admin@gmail.com",
  };
  const updateleague = async () => {
    history.push({
      pathname: "/edittournament/",
      state: teamCodeAndName,
    });
  };

  const service = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const adminpanel = async () => {
    history.push({
      pathname: "/adminpanel/",
      // state: teamCodeAndName,
    });
  };

  const loginout = async () => {
    const { error } = await supabase.auth.signOut();
    history.push({
      pathname: "/Mainlogin/",
    });
  };
  const daysfondcall = async (finaldata) => {
    setLoadingtable(true);
    for (let index = 0; index < finaldata.length; index++) {
      const { error } = await supabase
        .from("playerlist")
        .update({
          id: index,
          playername: finaldata[index].name,
          price: finaldata[index].price,
          pointsearned: "0",
        })
        .eq("id", index);
    }
    setLoadingtable(false);

    // for (let index = 0; index < finaldata.length; index++) {
    //   console.log("id", index);
    //   const { error } = await supabase
    //     .from('playerlist')
    //     .delete()
    //     .eq('id', index);
    // }
    // console.log("ddat", finaldata);
    // const { data } = await supabase.from("playerlist").select();

    // if (data.length === 0) {
    //   console.log("data", finaldata);
    //   for (let index = 0; index < finaldata.length; index++) {
    //     console.log("data", index);
    //     const { data, error } = await supabase.from('playerlist').insert({
    //       id: index,
    //       playername: finaldata[index].name,
    //       price: finaldata[index].price,
    //       pointsearned: "0"
    //     })
    //   }
    //   //test();
    // }
  };

  const update = async (updatedRows) => {
    for (let index = 0; index < updatedRows.length; index++) {
      const { error } = await supabase
        .from("playerlist")
        .delete()
        .eq("id", index);
    }
    const { data } = await supabase.from("playerlist").select();

    if (data.length === 0) {
      for (let index = 0; index < updatedRows.length; index++) {
        const { data, error } = await supabase.from("playerlist").insert({
          id: index,
          playername: updatedRows[index].playername,
          price: updatedRows[index].price,
          pointsearned: updatedRows[index].pointsearned,
        });
      }
      const { data } = await supabase.from("playerlist").select();
      if (data.length !== 0) {
        setPlayersdata(data);
        // console.log(data);
      }
      //test();
    }
  };
  const apicall = async () => {
    // console.log("Playersdatas.length", Playersdatas.length);

    for (let index = 0; index < 300; index++) {
      console.log("id", index);
      const { error } = await supabase
        .from("playerlist")
        .delete()
        .eq("id", index);
    }
    const { data } = await supabase.from("playerlist").select();
    console.log("data Playersdatas.length", data.length);
    if (data.length === 0) {
      console.log("data Playersdatas.length", Playersdatas.length);
      for (let index = 0; index < Playersdatas.length; index++) {
        console.log("data", index);
        const { data, error } = await supabase.from("playerlist").insert({
          id: index,
          playername: Playersdatas[index].name,
          price: Playersdatas[index].price,
          pointsearned: Playersdatas[index].score,
        });
      }
      test();
    } else {
      console.log("lenght is not 0");
    }
  };
  // console.log("top50", Playersdata.slice(0, 50));

  // new part --Hitesh's code
  // let pers = useRef("");
  // let players = useRef("");
  // var myPrice;
  let [tour, setTour] = useState([]);
  const [tourcng, setTourcng] = useState("");
  const [wincng, setWindowcng] = useState("");
  let [apifunc, setApifunc] = useState([]);
  const [persons, setPersons] = useState([]);
  const [Player, setPlayer] = useState([]);
  let [jsonResult, setJsonResult] = useState([]);
  let [testPlayer, setTestPlayer] = useState([]);
  let [tourchange, setTourchange] = useState(false);
  let [windowchange, setWindowchange] = useState(false);
  const [syncbtn, setSyncbtn] = useState(false);
  const [inptempty, setInptempty] = useState(false);
  let [playerslistData, setPlayerslistdata] = useState([]);
  const [updateprice, setUpdatePrice] = useState('');
  const [id,setId]=useState('')
  // const [ShowPrice,setShowPrice]=useState(false)
  const [home_List, setHome_List] = useState(true);
  const [tour_List, setTour_List] = useState(false);
  const [event_List, setEvent_List] = useState(false);
  const [player_List, setPlayer_List] = useState(false);
  const [player_num, setPlayer_num] = useState(0);
  const [Player_count, setPlayer_count] = useState({
    start: 0,
    end: player_num,
  });
  let [eventLogic, setEventLogic] = useState([]);
  let [newLogic, setNewLogic] = useState([]);

  // const { start, end } = Player_count;

  // var mywindows = [];
  // var Playername = [];
  var player;
  //player is a dependecy of useEeffect hook
  // var displayPlayersname = [];
  var result;
  // var persData;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  // const [windows, setWindows] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const apicall = await axios(
        `https://fortniteapi.io/v1/events/list?lang=en&region=NAE`,
        {
          method: "GET",
          headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
        }
      );
      let apidata = await apicall.data.events;
      setJsonResult(apidata);
    };

    getdata();
  }, []);

  let windowsid = jsonResult.filter((e) => e.id === tourcng);
  const tourId = windowsid[0];
  let prodata = tourId === undefined ? "" : tourId.windows;
  let resultdata = tourId === undefined ? "" : prodata[0].windowId;
  player = resultdata;

  const api = `https://fortniteapi.io/v1/events/window?windowId=${player}`;
  
  useEffect(() => {
    axios(api, {
      method: "GET",
      headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
    })
      .then((res) => res.data.session)
      .then((data) =>
        !data ? setLoading(true) : setPersons([data.results.slice(0, 10)])
      );
  }, [player]);

  useEffect(() => {
    axios(api, {
      method: "GET",
      headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
    })
      .then((res) => res.data.session)
      .then((data) => {
        const filterdata = data.results;
        setApifunc(filterdata);
        let new_data = filterdata.map((e, i) => {
          return e.teamAccountNames;
        });
        const final = new_data.map((e, i) => {
          return e;
        });
        setPlayer(final);
      });
  }, [player]);

  useEffect(() => {
    axios(api, {
      method: "GET",
      headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
    }).then((res) => {
      setTestPlayer([res.data.session]);
    });
  }, [player]);

  let changetour = (e) => {
    setTourcng(e.target.outerText);
    setTourchange(true);
    if (tourchange) {
      setInptempty(true);
    } else {
      setInptempty(false);
    }
  };

  let changeWindow = (e) => {
    setTour(e.target.outerText);
    setWindowcng(e.target.outerText);
    setWindowchange(true);

    if (tour) {
      setSyncbtn(true);
      setInptempty(true);
    } else {
      setInptempty(false);
    }
  };

  const selcet_list = () => {
    setPlayer_List(false);
    setTour_List(false);
    setHome_List(true);
    setEvent_List(false);
  };

  const tours_list = () => {
    setPlayer_List(false);
    setTour_List(true);
    setHome_List(false);
    setEvent_List(false);
  };
  const events_list = () => {
    setPlayer_List(false);
    setEvent_List(true);
    setHome_List(false);
    setTour_List(false);
  };
  const players_list = () => {
    setPlayer_List(true);
    setHome_List(false);
    setTour_List(false);
    setEvent_List(false);
  };

  //fetching data of tournamentlist from supabase
  let [supaData, setSupadata] = useState([]);
  const getSupadata = async () => {
    const { data, error } = await supabase.from("tournamentlist").select();
    setSupadata(data);
  };

  //fetching data of eventlist from supabase
  let [tourlistData, setTourlistdata] = useState([]);
  const gettourlist = async () => {
    const { data, error } = await supabase.from("eventslist").select();
    setTourlistdata(data);
  };

  //fetching data of eventlist from supabase
  const getplayerlist = async () => {
    const { data, error } = await supabase.from("allplayerslist").select();
    setPlayerslistdata(data);
  };

  useEffect(() => {
    getSupadata();
    gettourlist();
    getplayerlist();
  }, []);

  const tournamentlistSupabase = async () => {
    const { data, error } = await supabase.from("tournamentlist").insert({
      tournamentname: eventLogic[0].eventId,
      tournamentstartdate: eventLogic[0].beginTime,
      tournamentenddate: eventLogic[0].endTime,
      createddate: new Date(),
      modifieddate: new Date(),
    });
    console.log("apierror", error);
  };

  const eventslistSupabase = async () => {
    const { data, error } = await supabase.from("eventslist").insert({
      eventsname: eventLogic[0].windowId,
      // tournamentid: 1,
      playersnumber: player_num,
      startdate: eventLogic[0].beginTime,
      enddate: eventLogic[0].endTime,
      createddate: new Date(),
      modifieddate: new Date(),
    });
    console.log("eventslist error", error);
  };

  const allplayername = async () => {
    eventLogic.map(async (e, i) => {
      console.log("newlogic console...", e);
      let name1 = e.teamAccountNames[0].name;
      let name2 = e.teamAccountNames[1].name;
      let combineName = name1 + " & " + name2;
      const { data, error } = await supabase.from("allplayerslist").insert({
        playername: combineName,
        price: 0,
        pointsearned: e.pointsEarned,
        // eventid: 1,
        createddate: new Date(),
        modifieddate: new Date(),
      });
      return e;
    });
    console.log("playerlist error", error);
  };

  let PlayerNum = () => {
    // tournamentlistSupabase();
    // eventslistSupabase();
    // allplayername()
    // playerapitest()
    setPlayer_List(true);
    setHome_List(false);
    setTour_List(false);
    setEvent_List(false);
  };
  let playerapitest = () => {
    apifunc.map((e, i) => {
      return (
        <>
          <p>
            {e.teamAccountNames[0].name}
            &nbsp; & &nbsp;
            {e.teamAccountNames[1].name}
          </p>
        </>
      );
    });
  };
  

  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const hours = ("0" + t.getHours()).slice(-2);
  const minutes = ("0" + t.getMinutes()).slice(-2);
  const seconds = ("0" + t.getSeconds()).slice(-2);
  const time = `${year}-${month}-${date}`;

  //event list logic

  var result = [];
  for (let Newdata of prodata) {
    result.push(Newdata);
  }

  var myresult;
  result.map((e, i) => {
    return (myresult = `https://fortniteapi.io/v1/events/window?windowId=${e.windowId}`);
  });

  let Newapi = `https://fortniteapi.io/v1/events/window?windowId=${tour}`;

  // console.log("New API",playersapi)
  useEffect(() => {
    axios(Newapi, {
      method: "GET",
      headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
    })
      .then((res) => res.data)
      .then((data) =>
        !data ? setLoading(true) : setEventLogic(data.session.results)
      );
  }, [Newapi]);

  //New Player list insertng in db
  useEffect(() => {
    axios(Newapi, {
      method: "GET",
      headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
    })
      .then((res) => res.data)
      .then((data) => (!data ? setLoading(true) : setNewLogic(data.session)));
  }, [Newapi]);

  //purpose of testing of combine players name
  var combineName;
  useEffect(() => {
    axios(Newapi, {
      method: "GET",
      headers: { Authorization: "04876d40-df9ddb98-13a88349-fe7809ed" },
    }).then((res) => {
      for (let index = 0; index < res.data.session.results.length; index++) {
        for (let i = 0; i < plyr; index++) {
          var plyr1 =
            res.data.session.results[index].teamAccountNames[0].length;
          var plyr2 =
            res.data.session.results[index].teamAccountNames[1].length;
          var plyr = plyr1 + plyr2;
          var name1 = res.data.session.results[index].teamAccountNames[0].name;
          var name2 = res.data.session.results[index].teamAccountNames[1].name;
          var combineName = name1 + " & " + name2;
          console.log("combine name", combineName);
        }
      }
    });
  }, [Newapi]);

  

  let clicktoUpdate = (e) => {
    setId(e.id)
  };

  let priceChange=(e)=>{
setUpdatePrice(e.target.innerText)
let priceFunc = async () => {
  const { error } = await supabase
    .from("allplayerslist")
    .update({ price: updateprice})
    .eq("id",id );
};
priceFunc();
  }

  let changeScore = async () => {
    tourlistData.map((e, i) => {
      // console.log("data", time > e.enddate);
      // console.log("players",e.enddate)
      // var result = [];
      // for (let Newdata of prodata) {
      //   result.push(Newdata);
      // }
      // time>e.enddate?console.log("old",e.enddate):console.log("new",e.enddate);
      if (time > e.enddate) {
        // console.log("old end date",e)
        // console.log("players data",eventLogic)
        const func = async () => {
          // const { error } = await supabase
          //   .from("allplayerslist")
          //   .update({ score: 0 })
          //   .eq("id");
          // .insert({newscore:0})
        };

        func();
      }


      return <></>;
    });
  };
  useEffect(() => {
    changeScore();
  }, [tourlistData]);
  // let Showme=()=>{
  //   setShowPrice(true)
  // }

  const inputchange=(e)=>{
    console.log("events",e)
    setUpdatePrice(e.target.innerText)
  }
  console.log("player list new", playerslistData);
  console.log("newLogic", newLogic.results);
  return (
    <>
      <div className="sectionlanding">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <img src={logoimages} style={{ width: 100, height: 100 }} />
          </div>
        ) : (
          <div className="contenorlanding">
            <div className="contentrow col-12">
              <div className="nevcolumn col-2">
                {/* <img className="photoimagelanding" src={Logo1}  /> */}
                <div className="nevlogo">
                  <img className="photoimagelanding" src={Logo1} />
                </div>

                <div className="nevlistst">
                  {/* <li className="listnevbars"><a onClick={service}>Player List</a></li> */}
                  <li className="listnevbars">
                    <a
                      className="tournament-list-admin-penal"
                      onClick={selcet_list}
                    >
                      Selection List
                    </a>
                  </li>
                  <li className="listnevbars">
                    <a
                      className="tournament-list-admin-penal"
                      onClick={tours_list}
                    >
                      Tournaments List
                    </a>
                  </li>
                  <li className="listnevbars">
                    <a
                      className="tournament-list-admin-penal"
                      onClick={events_list}
                    >
                      Events List
                    </a>
                  </li>
                  <li className="listnevbars">
                    <a
                      className="tournament-list-admin-penal"
                      onClick={players_list}
                    >
                      Players List
                    </a>
                  </li>
                </div>
              </div>

              <div
                className="col-10 screensection"
                style={{ height: "auto", background: "#F8F8F8" }}
              >
                <div className="landingRow col-12">
                  <div className="nevbarbutton p-0">
                    <button
                      className="nevbarlogbutton m-0"
                      onClick={() => loginout()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="landingsscreens">
                  <div className="landing-box col-12">
                    <div className="col-12 d-flex align-items-center"></div>
                    <div style={{ overflowy: "auto" }}>
                      <div className="syncname">
                        <button className="syncbutton" onClick={apicall}>
                          sync
                        </button>
                      </div>
                      <div></div>
                    </div>

                    {/* mywindows plays important role */}
                    {/* {jsonResult
                      .filter((e, i) => e.id === tourcng)
                      .map((e, i) => {
                        mywindows = e.windows;
                        console.log("mywindows", mywindows);
                        return "";
                      })} */}

                    {home_List ? (
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <Stack sx={{ width: 400, margin: "auto" }}>
                          <Autocomplete
                            disablePortal
                            id="nba_player_demo"
                            getOptionLabel={(jsonResult) => `${jsonResult.id}`}
                            options={jsonResult}
                            sx={{ width: 400 }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            noOptionsText={"no availbale"}
                            onChange={(e) => changetour(e)}
                            renderOption={(props, jsonResult) => (
                              <Box
                                component="li"
                                {...props}
                                key={jsonResult.id}
                              >
                                {jsonResult.id}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Your Tournament..."
                              />
                            )}
                          />
                          {jsonResult
                            .filter((e) => e.id === tourcng)
                            .map((e, i) => {
                              return (
                                <>
                                  <div
                                    className="alert alert-primary mt-2"
                                    role="alert"
                                  >
                                    Begin Time:- {e.beginTime}
                                  </div>
                                  <div
                                    className="alert alert-danger mt-2"
                                    role="alert"
                                  >
                                    End Time:- {e.endTime}
                                  </div>
                                </>
                              );
                            })}
                        </Stack>
                        {tourId === undefined ? (
                          ""
                        ) : (
                          <>
                            <Stack sx={{ width: 400, margin: "auto" }}>
                              <Autocomplete
                                disablePortal
                                id="nba_player_demo"
                                getOptionLabel={(result) =>
                                  `${result.windowId}`
                                }
                                options={result}
                                sx={{ width: 400 }}
                                isOptionEqualToValue={(option, value) =>
                                  option.windowId === value.windowId
                                }
                                noOptionsText={"no availbale"}
                                onChange={(e) => changeWindow(e)}
                                renderOption={(props, result) => (
                                  <Box
                                    component="li"
                                    {...props}
                                    key={result.windowId}
                                  >
                                    {result.windowId}
                                  </Box>
                                )}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Your Event!..."
                                  />
                                )}
                              />
                              {result
                                .filter((e) => e.windowId === wincng)
                                .map((e, i) => {
                                  return (
                                    <>
                                      <div
                                        className="alert alert-primary mt-2"
                                        role="alert"
                                      >
                                        Begin Time:- {e.beginTime}
                                      </div>
                                      <div
                                        className="alert alert-danger mt-2"
                                        role="alert"
                                      >
                                        End Time:- {e.endTime}
                                      </div>
                                    </>
                                  );
                                })}
                            </Stack>
                          </>
                        )}
                        {/* <div className="d-flex flex-column mt-5">
                          <label htmlFor="player" className="my-2">
                            Please Enter The Players Number!
                          </label>
                          <input
                            type="text"
                            className="form-control w-100 mb-2"
                            value={player_num}
                            onChange={(e) => setPlayer_num(e.target.value)}
                            placeholder="Number Of Players!"
                            id="player"
                          />
                        </div>
                        <button className="btn btn-primary" onClick={PlayerNum}>
                          Save
                        </button> */}
                        {syncbtn ? (
                          <button className="syncbutton" onClick={PlayerNum}>
                            Synchronize
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}

                    {tour_List ? (
                      <>
                        {tourId === undefined ? (
                          <h1 className="text-center my-5">Loading...</h1>
                        ) : (
                          <>
                            <center className="mx-5">
                              <h1 className="text-success">Tournaments List</h1>
                            </center>
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tournament Name</th>
                                    <th scope="col">Tournament Startdata</th>
                                    <th scope="col">Tournament Enddata</th>
                                    <th scope="col">Created date</th>
                                    <th scope="col">Modified date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* {
                                    testPlayer.map((e, i) => {
                                      console.log("tournament list", e)
                                      return (
                                        <>
                                          <tr key={i + 1}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{e.eventId}</td>
                                            <td>{e.beginTime}</td>
                                            <td>{e.endTime}</td>
                                            <td>Created Date</td>
                                            <td>Modified date</td>
                                          </tr>
                                        </>
                                      )
                                    })
                                  } */}

                                  {supaData.map((e, i) => {
                                    return (
                                      <>
                                        <tr key={i + 1}>
                                          <th scope="row">{i + 1}</th>
                                          <td>{e.tournamentname}</td>
                                          <td>{e.tournamentstartdate}</td>
                                          <td>{e.tournamentenddate}</td>
                                          <td>{e.createddate}</td>
                                          <td>{e.modifieddate}</td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    {event_List ? (
                      <>
                        {tourId === undefined ? (
                          <h1 className="text-center my-5">Loading...</h1>
                        ) : (
                          <>
                            <center className="mx-5">
                              <h1 className="text-success">Events List</h1>
                            </center>
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Events Name</th>
                                    <th scope="col">Tournament Id</th>
                                    <th scope="col">Player Numbers</th>
                                    <th scope="col">Start date</th>
                                    <th scope="col">End date</th>
                                    <th scope="col">Created date</th>
                                    <th scope="col">Modified date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                 
                                  {tourlistData.map((e, i) => {
                                    return (
                                      <>
                                        <tr key={i + 1}>
                                          <th scope="row">{i + 1}</th>
                                          <td>{e.eventsname}</td>
                                          <td>{e.tournamentId}</td>
                                          <td>{e.playersnumber}</td>
                                          <td>{e.startdate}</td>
                                          <td>{e.enddate}</td>
                                          <td>{e.createddate}</td>
                                          <td>{e.modifieddate}</td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    {player_List ? (
                      <>
                        {tourId === undefined ? (
                          <h1 className="text-center my-5">Loading...</h1>
                        ) : (
                          <>
                            <center className="mx-5">
                              <h1 className="text-success">Players List</h1>
                            </center>
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Player Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">PointsEearned</th>
                                    <th scope="col">EventId</th>
                                    <th scope="col">Created date</th>
                                    <th scope="col">Modified date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {playerslistData
                                    // .slice(start, player_num)
                                    .map((e, i) => {
                                     return (
                                        <>
                                          <tr key={i + 1}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{e.playername}</td>
                                            <td contentEditable={true} onClick={()=>clicktoUpdate(e)} 
                                            // onInput={inputchange}
                                            onKeyUp={priceChange}
                                            >
                                              {e.price} 
                                            </td>
                                            <td>{e.pointsearned}</td>
                                            <td>{e.eventID}</td>
                                            <td>{e.createddate}</td>
                                            <td>{e.modifieddate}</td>
                                          </tr>
                                        </>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
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
