import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/landing';
import RestsMap from './pages/RestsMap';
import Rest from './pages/Rest';
import CreateRest from './pages/CreateRest';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={RestsMap} />
  
        <Route path="/rests/create" component={CreateRest} />
        <Route path="/rests/:id" component={Rest} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;