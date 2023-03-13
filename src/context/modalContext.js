import React, { createContext, useState } from "react";

export const modalContext = createContext();

const Context = ({ children }) => {
  const [modalDetails, setModalDetails] = useState({});

  return (
    <modalContext.Provider value={{ modalDetails, setModalDetails }}>
      {children}
    </modalContext.Provider>
  );
};

export default Context;
