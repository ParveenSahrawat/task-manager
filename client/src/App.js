import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Parent from './components/Parent';
import Header from './components/Header';
import TasksList from './components/TasksList';
import AddTask from './components/AddTask';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {

  return (
    <Fragment>
      <BrowserRouter>
          <div>
            <Header />
            <Parent>
              <Switch>
                <PrivateRoute path="/tasks/new" component={AddTask} />
                {/* <Route exact path="/tasks/:_id" component={TaskDetail} /> */}
                <PrivateRoute path="/tasks" component={TasksList} />
                <Route path="/signup" component={SignUp} />
                <Route path="/" component={Login} />
              </Switch>
            </Parent>
          </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;