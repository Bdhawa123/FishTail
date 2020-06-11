import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './Components/Index';
import StyleContextProvider from './contexts/StyleContext';
import DataContextProvider from './contexts/DataContext';
import HandleSubmitContextProvider from './contexts/HandleSubmitContext';

const App = () => (
  <StyleContextProvider>
    <DataContextProvider>
      <HandleSubmitContextProvider>
        <Index />
      </HandleSubmitContextProvider>
    </DataContextProvider>
  </StyleContextProvider>
);

export default App;
