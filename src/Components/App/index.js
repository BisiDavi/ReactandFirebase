import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Navigation, Landing, SignUp, Signin, Account,
  PasswordChange, PasswordForget, Home, Admin
} from '../imports/.'
import * as ROUTES from '../../constants/routes';

const App = () => {
  return (
    <Router>
      <Navigation />

      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={Signin} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
    </Router>
  )
}

export default App;
