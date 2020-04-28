import React from 'react';


const Index = () => {
    return (    
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
  </div>);
}
 
export default Index;