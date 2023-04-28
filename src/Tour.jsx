import React from 'react'
import Mainlogin from './components/pages/Mainlogin';
import Teamlogin from './components/pages/Teamlogin';
import Home from './Home';
import { Link, Route, Router, Switch } from 'react-router-dom';

const Tour = () => {
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => '',
      main: () => <Mainlogin/>
    },
    {
      path: "/teamlogin",
      sidebar: () => '',
      main: () => <Teamlogin />
    },
    {
      path: "/home",
      sidebar: () => <div>shoelaces!</div>,
      main: () => <Home />
    },
    {
      path: "/welcome",
      sidebar: () => '',
      main: () => <Mainlogin />
    }
  ];
  return (
    <>
    <Router>
        <Home />
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "10px",
              width: "20%",
              height: "100vh",
              background: "#f0f0f0"
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/teamlogin">teamlogin</Link>
              </li>
              <li>
                <Link to="/home">Shoelaces</Link>
              </li>
              <li>
                <Link to="/welcome">welcome</Link>
              </li>
            </ul>

            <Switch>
              {routes.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.sidebar />}
                />
              ))}
            </Switch>
          </div>

          <div style={{ flex: 1, padding: "10px" }}>
            <Switch>
              {routes.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </>
  )
}

export default Tour
