import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Routes from './routes';

function App() {

  const routes = Routes.map(({name, path, component}) => {
    return <Route
              exact
              key={name}
              path={path}
              component={component}
              />
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          {routes}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
