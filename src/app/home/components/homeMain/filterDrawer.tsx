import * as React from 'react';
import FilterContext from './context';
import { Box, Drawer, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import ChipCheckboxGroup from '@/app/components/chipCheckBoxGroup';
import { ClientTypeEnum, TeamTypeEnum, TimeTypeEnum } from './const';

const FilterDrawer: React.FC = () => {
  const {
    open,
    setOpen,
    teamTypeValues,
    setTeamTypeValues,
    clientTypeValues,
    setClientTypeValues,
    timeTypeValues,
    setTimeTypeValues,

  } = React.useContext(FilterContext);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleToggleTeamTypeChipCheckbox = (value: string) => {
    if (teamTypeValues.includes(value)) {
      setTeamTypeValues((prev) => prev.filter((val) => val !== value));
    } else {
      setTeamTypeValues((prev) => [...prev, value]);
    }
  };

  const handleToggleClientTypeChipCheckbox = (value: string) => {
    if (clientTypeValues.includes(value)) {
      setClientTypeValues((prev) => prev.filter((val) => val !== value));
    } else {
      setClientTypeValues((prev) => [...prev, value]);
    }
  };

  const handleToggleTimeTypeChipCheckbox = (value: string) => {
    if (timeTypeValues.includes(value)) {
      setTimeTypeValues((prev) => prev.filter((val) => val !== value));
    } else {
      setTimeTypeValues((prev) => [...prev, value]);
    }
  };


  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={toggleDrawer(false)}
    >
      <ChipCheckboxGroup
        group={
          {
            label: '招募种类',
            options: [
              { label: '2对2', value: TeamTypeEnum._2V2 },
              { label: '3对3', value: TeamTypeEnum._3V3 },
              { label: '5对5', value: TeamTypeEnum._5V5 },
            ],
          }
        }
        values={teamTypeValues}
        onClick={handleToggleTeamTypeChipCheckbox}
      />
      <ChipCheckboxGroup
        group={
          {
            label: '客户端',
            options: [
              { label: '旗舰', value: ClientTypeEnum.QJ },
              { label: '无界', value: ClientTypeEnum.WJ },
            ],
          }
        }
        values={clientTypeValues}
        onClick={handleToggleClientTypeChipCheckbox}
      />
      <ChipCheckboxGroup
        group={
          {
            label: '时间',
            options: [
              { label: '提前', value: TimeTypeEnum.IN_ADVANCE },
              { label: '现在', value: TimeTypeEnum.IMMEDIATELY },
            ],
          }
        }
        values={timeTypeValues}
        onClick={handleToggleTimeTypeChipCheckbox}
      />
    </Drawer>
  )
};

export default FilterDrawer;