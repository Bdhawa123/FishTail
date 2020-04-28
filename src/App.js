import React,{useContext}from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Sales from './Components/Sales';
import SManagement from './Components/SManagement';
import SReport from './Components/SReport';
import Inventory from './Components/Inventory';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import StyleContextProvider, { StyleContext } from './contexts/StyleContext';


const  App=()=> {

    //const {blur,toggleBlur} = useContext(StyleContext);

  return (
    <StyleContextProvider>
      <div className="container" >
        <Header/>
          <Router>
            <Switch>
              <Route exact path ="/Home" component={Home}/>
              <Route path = "/Sales" component={Sales}/>
              <Route path = "/SManagement" component={SManagement}/>
              <Route path = "/SReport" component={SReport}/>
              <Route path = "/Inventory" component={Inventory}/>            
              <Route exact path = "/" component = {Home}/>
            </Switch>
          </Router>
        <Footer/>
      </div>
    </StyleContextProvider>
  );
}

export default App;
