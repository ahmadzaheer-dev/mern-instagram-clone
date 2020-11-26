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
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <div>
            <Navbar />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact={true} path="/" component={Feed} />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
