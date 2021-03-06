import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';

import Dashboard from '../Pages/Dashboard';
import New from '../Pages/New';
import Details from '../Pages/Details';
import Atualizar from '../Pages/Atualizar';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/new" component={New} isPrivate />
    <Route path="/atualizar/:professor" component={Atualizar} isPrivate />
    <Route path="/details/:professor" component={Details} isPrivate />
    
  </Switch>
);

export default Routes;
