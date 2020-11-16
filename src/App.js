import React from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search}/>
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default App;
