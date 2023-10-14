import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegistrationPage} />
        <Route path="/" render={() => <h1>Welcome to the Home Page</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
