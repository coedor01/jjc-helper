import React, { createContext, ReactNode } from 'react';
import { OrderByEnum, TeamTypeEnum, TimeTypeEnum, ClientTypeEnum } from './const';


interface FilterContextType {
  open: boolean,
  setOpen: (value: boolean) => void,
  orderBy: string;
  setOrderBy: (value: string) => void;
  teamTypeValues: string[];
  setTeamTypeValues: React.Dispatch<React.SetStateAction<string[]>>;
  clientTypeValues: string[];
  setClientTypeValues: React.Dispatch<React.SetStateAction<string[]>>;
  timeTypeValues: string[];
  setTimeTypeValues: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterContext = createContext<FilterContextType>({
  open: false,
  setOpen: () => { },
  orderBy: OrderByEnum.DEAFULT,
  setOrderBy: () => { },
  teamTypeValues: [TeamTypeEnum._3V3],
  setTeamTypeValues: () => { },
  clientTypeValues: [ClientTypeEnum.QJ],
  setClientTypeValues: () => { },
  timeTypeValues: [TimeTypeEnum.IMMEDIATELY],
  setTimeTypeValues: () => { },
});



export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [orderBy, setOrderBy] = React.useState<string>(OrderByEnum.DEAFULT);
  const [teamTypeValues, setTeamTypeValues] = React.useState<string[]>([TeamTypeEnum._3V3]);
  const [clientTypeValues, setClientTypeValues] = React.useState<string[]>([ClientTypeEnum.QJ]);
  const [timeTypeValues, setTimeTypeValues] = React.useState<string[]>([TimeTypeEnum.IMMEDIATELY]);


  return (
    <FilterContext.Provider value={{
      open,
      setOpen,
      orderBy,
      setOrderBy,
      teamTypeValues,
      setTeamTypeValues,
      clientTypeValues,
      setClientTypeValues,
      timeTypeValues,
      setTimeTypeValues,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
