import "./App.css";
import { useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import SignUp from "./components/auth/Signup";
import { loadUser } from "./actions/auth";
import Feed from "./components/Feed";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/">
            <Feed />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
