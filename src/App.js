import React from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

import {
  Switch,
  Route
} from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/search" component={Search} />
    <Route component={NotFound} />
  </Switch>
)

export default App;
