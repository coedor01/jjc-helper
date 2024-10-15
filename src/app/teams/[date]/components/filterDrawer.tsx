import * as React from 'react';
import { Drawer } from '@mui/material';
import ChipCheckboxGroup from '@/app/components/chipCheckBoxGroup';
import { ClientTypeEnum, TeamTypeEnum, TimeTypeEnum, TeamsQueries, DEFAULT_QUERIES } from '../const';
import Context from '../context';
import useQueryHook from '@/hooks/query';
import { usePathname, useRouter } from 'next/navigation';

const FilterDrawer: React.FC = () => {
  const {
    drawOpen,
    setDrawOpen,
  } = React.useContext(Context);

  const {
    searchParams,
    upsertMultiQueryString,
  } = useQueryHook();

  const [teamTypeValues, setTeamTypeValues] = React.useState<string[]>(
    (searchParams.get(TeamsQueries.TEAM_TYPE) || DEFAULT_QUERIES[TeamsQueries.TEAM_TYPE]).split(",")
  );
  const [clientTypeValues, setClientTypeValues] = React.useState<string[]>(
    (searchParams.get(TeamsQueries.CLIENT_TYPE) || DEFAULT_QUERIES[TeamsQueries.CLIENT_TYPE]).split(",")
  );
  const [timeTypeValues, setTimeTypeValues] = React.useState<string[]>(
    (searchParams.get(TeamsQueries.TIME_TYPE) || DEFAULT_QUERIES[TeamsQueries.TIME_TYPE]).split(",")
  );

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

  const router = useRouter();
  const pathname = usePathname();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawOpen(newOpen);
    const params = upsertMultiQueryString({
      [TeamsQueries.TEAM_TYPE]: teamTypeValues.join(","),
      [TeamsQueries.CLIENT_TYPE]: clientTypeValues.join(","),
      [TeamsQueries.TIME_TYPE]: timeTypeValues.join(",")
    });
    const newUrl = pathname + '?' + params;
    console.log(`Drawer收起, newUrl=${newUrl}`);
    router.push(newUrl);

  };


  return (
    <Drawer
      anchor='bottom'
      open={drawOpen}
      onClose={toggleDrawer(false)}
    >
      <ChipCheckboxGroup
        key={0}
        group={
          {
            title: { label: '招募种类', value: TeamsQueries.TEAM_TYPE },
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
        key={1}
        group={
          {
            title: { label: '客户端', value: TeamsQueries.CLIENT_TYPE },
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
        key={2}
        group={
          {
            title: { label: '时间', value: TeamsQueries.TIME_TYPE },
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