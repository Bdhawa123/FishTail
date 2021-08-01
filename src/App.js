import React, { useContext } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./Components/Index";
import StyleContextProvider from "./contexts/StyleContext";
import DataContextProvider from "./contexts/DataContext";
import store from "./redux/store";

const App = () => (
  <Provider store={store}>
    <Index />
  </Provider>
);

export default App;
