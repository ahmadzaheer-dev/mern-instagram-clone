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
import Profile from "./components/Profile/Profile";
import PageNotFound from "./components/PageNotFound";
import CreatePost from "./components/post/CreatePost";

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
            <ProtectedRoute path="/post/create" component={CreatePost} />
            <ProtectedRoute exact={true} path="/" component={Feed} />
            <Route exact={true} path="/:username" component={Profile} />
          </div>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
