import React, { createContext, ReactNode } from 'react';


interface ContextType {
  drawOpen: boolean,
  setDrawOpen: (value: boolean) => void,
}

const Context = createContext<ContextType>({
  drawOpen: false,
  setDrawOpen: () => { },
});



export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [drawOpen, setDrawOpen] = React.useState<boolean>(false);


  return (
    <Context.Provider value={{
      drawOpen,
      setDrawOpen,
    }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
