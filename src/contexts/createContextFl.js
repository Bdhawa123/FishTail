import React, { useReducer, createContext } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions = {};

    Object.keys(actions).forEach((k) => {
      console.log(k.type);
      actions[k](dispatch);
    });

    // for (let key in actions) {
    //   boundActions[key] = actions[key](dispatch);
    // }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
