import { createContext, useContext, useState } from "react";

const corporacionContext = createContext();

export const CorporacionProvider = ({ children }) => {
  const [corporacionActiva, setCorporacionActiva] = useState(null);

  const seleccionarCorporacion = (corp) => {
    setCorporacionActiva(corp);
  };

  return (
    <corporacionContext.Provider
      value={{ corporacionActiva, seleccionarCorporacion }}
    >
      {children}
    </corporacionContext.Provider>
  );
};

export const useCorporacion = () => useContext(corporacionContext);
