import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './Components/Index';
import StyleContextProvider from './contexts/StyleContext';
import DataContextProvider from './contexts/DataContext';


const App = () => (
  <StyleContextProvider>
    <DataContextProvider>

      <Index />
    </DataContextProvider>
  </StyleContextProvider>
);

export default App;
