

import React from 'react';
import './components/Homepage.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Teamlogin from './components/pages/Teamlogin';
import SplashScreen from './components/pages/SplashScreen';
import TeamSelectscreen from './components/pages/TeamSelectscreen.js';
import Registrationscreen from './components/pages/Registrationscreen.js';
import Mainlogin from './components/pages/Mainlogin.js';
import demo from './components/pages/demo.js';
import NervesLeague from './components/pages/NervesLeague.js';
import WelcomesScreen from './components/pages/WelcomesScreen.js';
import EnterCompetition from './components/pages/EnterCompetition.js';
import adminpanel from './components/pages/adminpanel.js';
import edittournament from './components/pages/edittournament.js';
import CreateLeague from './components/pages/CreateLeague.js';
import SuccessfullyCreated from './components/pages/SuccessfullyCreated.js';
import landingscreen from './components/pages/landing-screen.js';
import UpdatePlayerScreen from './components/pages/UpdatePlayerScreen.js';
import ResetPassword from './components/pages/ResetPassword.js';
import Emailconform from './components/pages/Emailconform.js';
import NewPasswordSuccessfullyCreated from './components/pages/NewPasswordSuccessfullyCreated.js';
import { supabase } from "./supabaseClient";
import { useEffect } from 'react';
import { useState } from 'react';
import LeagueMGMTScreenNersLeague from './components/pages/LeagueMGMTScreenNersLeague';
import LeagueMGMTScreen5League from './components/pages/LeagueMGMTScreen5League';
import playerslist from './components/pages/playerslist.js';
import Newcompo from './components/pages/Newcompo';
import Sidebar from './Sidebar';
import Home from './Home';
import SideMUI from './SideMUI';
import Tour from './Tour';
import HeaderMUI from './HeaderMUI';
// import TournamentList from './TournamentsList';
// import TournamentList from './components/pages/TournamentList';

export default function App() {

  const [mainSession, setMainSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchAuthStateChange = () => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          if (session.user.recovery_sent_at) {
            setMainSession(true);
            setLoading(false);
          } else {
            setMainSession(false);
            setLoading(false);
          }
        } else {
          console.log("Redirect to login page");
          setLoading(false);
        }
      }
    );
  };
  useEffect(() => {
    //getData();
    fetchAuthStateChange();
  }, []);

  return (
    <>
      <Router>

        <Switch>

          {mainSession === true ? (<Route exact strict path={'/ResetPassword'} component={ResetPassword} />) : mainSession === false ? (<Route exact strict path={'/Emailconform'} component={Emailconform} />) : (<Route exact strict path={'/'} component={SplashScreen} />)}
          <Route exact strict path={'/'} component={Mainlogin} />
          <Route exact strict path={'/newcompo/'} component={SideMUI} />
          <Route exact strict path={'/tour/'} component={Tour} />
          {/* <Route exact strict path={'/tournaments/'} component={TournamentList} /> */}

          {/* <Route exact strict path={'/Teamlogin/'} component={Teamlogin} />
        <Route exact strict path={'/TeamSelectscreen/'} component={TeamSelectscreen} />
        <Route exact strict path={'/Registrationscreen/'} component={Registrationscreen} /> */}
          <Route exact strict path={'/Mainlogin/'} component={Mainlogin} />
          {/* <Route exact strict path={'/Forgotscreen/'} component={Forgotscreen} /> */}
          <Route exact strict path={'/create-league/'} component={CreateLeague} />
          <Route exact strict path={'/create-league-successful/'} component={SuccessfullyCreated} />
          {/* <Route exact strict path={'/landing-screen/'} component={landingscreen} />
        <Route exact strict path={'/NewPasswordSuccessfullyCreated/'} component={NewPasswordSuccessfullyCreated} />
        <Route exact strict path={'/WelcomesScreen/'} component={WelcomesScreen} />
        <Route exact strict path={'/EnterCompetition/'} component = { EnterCompetition } />
        <Route exact strict path={'/nerves-league/'} component = { NervesLeague } />
        <Route exact strict path={'/update-player-screen/'} component = {  UpdatePlayerScreen } />
        <Route exact strict path={'/league-mgmt-screen/'} component={LeagueMGMTScreen} />
        <Route exact strict path={'/league-mgmt-screen-ners-league/'} component={LeagueMGMTScreenNersLeague} />
        <Route exact strict path={'/league-mgmt-screen-5league/'} component={LeagueMGMTScreen5League} />*/}
          <Route exact strict path={'/demo/'} component={demo} />
          <Route exact strict path={'/adminpanel/'} component={adminpanel} />
          <Route exact strict path={'/edittournament/'} component={edittournament} />


        </Switch>
      </Router>


    </>
  );
}

