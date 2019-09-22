import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Welcome from '../Welcome/Welcome';
import 'typeface-roboto';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AnimatedSwitch } from 'react-router-transition';
import ActivityListPage from '../ActivityListPage/ActivityListPage';

const App: React.FC = () => {
  return (
    <div className="App">
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/activities" exact component={ActivityListPage} />
        <Route path="/" exact component={Welcome} />
      </AnimatedSwitch>
    </Router>
    </div>
  );
}

export default App;
