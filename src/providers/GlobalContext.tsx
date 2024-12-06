// src/providers/GlobalContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
type GlobalContextType = {
  state: {[key: string]: any};
  setState: (state: {[key: string]: any}) => void;
  updateState: (key: string, value: any) => void;
  updateTableState: (statename: string, key: string, value: any) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children, lang }: { children: ReactNode, lang: string }) => {
  const [state, setState] = useState<{[key: string]: any}>({
    view: false,
    options: {}
  });

  const updateState = (key: string, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const updateTableState = (statename: string, key: string, value: any) => {
    setState((prev) => {
      return {
        ...prev,
        [statename]: {
          ...prev[statename],
          [key]: value
        }
      }
    })
  }
  
  return (
    <GlobalContext.Provider value={{ state, setState, updateState, updateTableState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
