import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AllTolls from "./pages/AllTolls";
import Home from "./pages/Home";
import AddNewToll from "./components/Popup/AddNewToll";
import AddVehicleEntry from "./components/Popup/AddVehicleEntry";
import EditToll from "./pages/EditToll";
import Analyze from "./pages/Analyze";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="layout_bottom">
        <Sidebar />
        <main className="main_content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/all-tolls" exact component={AllTolls} />
            <Route path="/add-vehicle" exact component={AddVehicleEntry} />
            <Route path="/add-toll" exact component={AddNewToll} />
            <Route path="/edit-toll/:toll_name" exact component={EditToll} />
            <Route path="/analyze" exact component={Analyze} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
