import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Sales from './Sales';
import SManagement from './SManagement';
import SReport from './SReport';
import Inventory from './Inventory';
import { StyleContext } from '../contexts/StyleContext';


const Index = () => {
  const { blur } = useContext(StyleContext);

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
