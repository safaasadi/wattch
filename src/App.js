import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Site from "./components/Site";

function App() {

  const [navOpen, setNavOpen] = useState(false)
  const [siteColor, setSiteColor] = useState()

  return (
    <div className="App">
        <Router>
            <Navbar modifyOpenNav={setNavOpen} isNavOpen={navOpen} setSiteColor={setSiteColor} />
            <Switch>
                <div className={`container ${siteColor}${navOpen ? ' pagemask' : ''}`}>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/sites/:site_id'>
                    <Site siteColor={siteColor} />
                    </Route>
                </div>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
