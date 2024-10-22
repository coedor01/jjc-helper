"use client";

import { notFound } from "next/navigation";
import TeamContent from "./components/TeamContent";
import NavBar from "@/app/components/navBar";
import { getTeam } from "./services";
import WarningBar from "./components/WarningBar";
import Members from "./components/Members";
import { Box, Button } from "@mui/material";
import { exitTeam } from "@/app/axios/localServices";
import { useSnackbar } from "@/app/components/snackbarProvider";
import { useEffect, useState } from "react";
import { TeamOut } from "./schemas";

interface Props {
  params: { id: string };
}

const TeamDetail: React.FC<Props> = ({ params }) => {
  const teamId = Number(params.id) as number;
  const [team, setTeam] = useState<TeamOut | null>(null);
  const fetchTeam = async () => {
    const res = await fetch(`/api/teams/${teamId}`);
    const body = await res.json();
    if (body.ok) {
      setTeam(body.data);
    } else {
      notFound();
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const { showSnackbar, showClientErrorSnackBar, showServerErrorSnackBar } =
    useSnackbar();
  const handleClickExit = async (teamId: number) => {
    try {
      const res = await exitTeam(teamId);
      if (res.data.ok) {
        showSnackbar("已退出队伍");
      } else {
        showClientErrorSnackBar(res.data.error);
      }
    } catch {
      showServerErrorSnackBar();
    }
  };

  return (
    <>
      <NavBar title="招募详情" />
      {team && <TeamContent item={team} sx={{ paddingTop: "5px" }} />}
      {team && <WarningBar item={team} sx={{ paddingTop: "5px" }} />}
      {team && <Members item={team} sx={{ marginTop: "5px" }} />}
      <Box
        sx={{
          width: "100%",
          marginTop: 1,
          // display: hidden ? "none" : "flex",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleClickExit(teamId)}
          sx={{ width: "100%", padding: "10px", borderRadius: 0 }}
        >
          退出队伍
        </Button>
      </Box>
    </>
  );
};

export default TeamDetail;
