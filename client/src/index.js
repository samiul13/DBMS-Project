import React from "react";
import ReactDOM from "react-dom";


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import FacultyLayout from "layouts/Faculty.js";
import StudentLayout from "layouts/Student.js";
import DeanLayout from "layouts/Dean.js";
import DeaprtmentHeadLayout from "layouts/DepartmentHead.js";

import Login from "./views/Login";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/faculty" render={(props) => <FacultyLayout {...props} />} />
      <Route path="/departmenthead" render={(props) => <DeaprtmentHeadLayout {...props} />} />
      <Route path="/student" render={(props) => <StudentLayout {...props} />} />
      <Route path="/dean" render={(props) => <DeanLayout {...props} />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
