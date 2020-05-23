import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './Components/Index';
import StyleContextProvider, { StyleContext } from './contexts/StyleContext';


const App = () => (
  <StyleContextProvider>
    <Index />
  </StyleContextProvider>
);

export default App;
