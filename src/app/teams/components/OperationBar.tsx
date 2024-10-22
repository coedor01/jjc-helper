"use client";

import * as React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OperationBarPanel from "@/app/components/operationBarPanel";
import { Drawer } from "@mui/material";
import { useRouter } from "next/navigation";
import ChipCheckboxGroup from "@/app/components/chipCheckBoxGroup";
import { ROOT_PATH } from "@/app/teams/const";
import { ClientTypeEnum, TeamTypeEnum, TeamsQueries } from "@/app/teams/const";
import useQueryHook from "@/hooks/query";

interface DrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const FilterDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const { searchParams, upsertMultiQueryString } = useQueryHook();
  let teamType = searchParams.get("teamType");
  if (teamType === undefined || teamType === null) {
    teamType = "";
  }
  let clientType = searchParams.get("clientType");
  if (clientType === undefined || clientType === null) {
    clientType = "";
  }
  const [teamTypeValues, setTeamTypeValues] = React.useState<string[]>(
    teamType.split(",")
  );
  const [clientTypeValues, setClientTypeValues] = React.useState<string[]>(
    clientType.split(",")
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

  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    const queryString = upsertMultiQueryString({
      teamType: teamTypeValues.join(","),
      clientType: clientTypeValues.join(","),
    });
    const newUrl = `${ROOT_PATH}?${queryString}`;
    console.log(`Drawer收起, newUrl=${newUrl}`);
    router.push(newUrl);
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
      <ChipCheckboxGroup
        key={0}
        group={{
          title: { label: "招募种类", value: TeamsQueries.TEAM_TYPE },
          options: [
            { label: "2对2", value: TeamTypeEnum._2V2 },
            { label: "3对3", value: TeamTypeEnum._3V3 },
            { label: "5对5", value: TeamTypeEnum._5V5 },
          ],
        }}
        values={teamTypeValues}
        onClick={handleToggleTeamTypeChipCheckbox}
      />
      <ChipCheckboxGroup
        key={1}
        group={{
          title: { label: "客户端", value: TeamsQueries.CLIENT_TYPE },
          options: [
            { label: "旗舰", value: ClientTypeEnum.QJ },
            { label: "无界", value: ClientTypeEnum.WJ },
          ],
        }}
        values={clientTypeValues}
        onClick={handleToggleClientTypeChipCheckbox}
      />
    </Drawer>
  );
};

const OperationBar: React.FC = () => {
  const [drawOpen, setDrawOpen] = React.useState<boolean>(false);

  const handleOnClickFilter = () => {
    setDrawOpen(true);
  };

  const router = useRouter();

  return (
    <>
      <FilterDrawer open={drawOpen} setOpen={setDrawOpen} />

      <OperationBarPanel
        sx={{
          position: "fixed",
          right: "5px",
          bottom: "10vh",
        }}
      >
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={handleOnClickFilter}
        >
          筛选
        </Fab>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={() => router.push("/teams/create")}
        >
          <AddIcon />
        </Fab>
      </OperationBarPanel>
    </>
  );
};

export default OperationBar;
