import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import NotFound from './common/NotFound';
import './App.css';

function App() {
  return (
    <div className="container-fuild">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
