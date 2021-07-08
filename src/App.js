import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Site from "./components/Site";

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Switch>
                <div className="container">
                    <Route exact path='/' component={Home} />
                    <Route exact path='/sites/:site_id' component={Site} />
                </div>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
