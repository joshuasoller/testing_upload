import React from "react";
import "./App.css";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import RetrieveData from "./components/RetreiveData";

import AddData from "./components/AddData";

import AdminEdit from "./components/AdminEdit"
import StudentAccess from "./components/StudentAccess"
import Widgets from "./components/widgets"

function App() {
  return (
    <HashRouter>
      <Switch>
        <React.Fragment>
        
          <Route path="/retrieve" component={StudentAccess} />
          <Route path="/add" component={AddData} />
          <Route path="/widgets" component={Widgets} />
          <Route path="/admin" component={AdminEdit} />

        
          
        </React.Fragment>
      </Switch>
    </HashRouter>
  );
}

export default App;
