import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Sales from "./Sales/Sales";
import SManagement from "./SManagement";
import SReport from "./SReport";
import Inventory from "./Inventory/Inventory";
import { StyleContext } from "../contexts/StyleContext";

const Index = () => {
  // const { blur } = useContext(StyleContext);

  const blur = useSelector((state) => state.styleReducer.blur);

  // console.log(some);
  return (
    <div className="container" style={blur.blurEffect}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route path="/Sales" component={Sales} />
          <Route path="/SManagement" component={SManagement} />
          <Route path="/SReport" component={SReport} />
          <Route path="/Inventory" component={Inventory} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default Index;
