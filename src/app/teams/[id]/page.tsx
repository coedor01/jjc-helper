"use client";

import { notFound, usePathname, useRouter } from "next/navigation";
import TeamContent from "./components/TeamContent";
import NavBar from "@/app/components/navBar";
import WarningBar from "./components/WarningBar";
import Members from "./components/Members";
import { Box, Button } from "@mui/material";
import { confirmTeam, exitTeam } from "@/app/axios/localServices";
import { useSnackbar } from "@/app/components/snackbarProvider";
import { useEffect, useState } from "react";
import { TeamDetail } from "@/app/core/v1/schemas";

interface Props {
  params: { id: string };
}

const TeamDetailPage: React.FC<Props> = ({ params }) => {
  const teamId = Number(params.id) as number;
  const [team, setTeam] = useState<TeamDetail | null>(null);
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

  const router = useRouter();
  const pathname = usePathname();
  const { showSnackbar, showClientErrorSnackBar, showServerErrorSnackBar } =
    useSnackbar();
  const handleClickConfirm = async (teamId: number) => {
    try {
      const res = await confirmTeam(teamId);
      if (res.data.ok) {
        showSnackbar("已确认能打");
        window.location.reload();
      } else {
        showClientErrorSnackBar(res.data.error);
      }
    } catch {
      showServerErrorSnackBar();
    }
  };
  const handleClickExit = async (teamId: number) => {
    try {
      const res = await exitTeam(teamId);
      if (res.data.ok) {
        showSnackbar("已退出队伍");
        window.location.reload();
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
      {team && team.inTeam && !team.confirmed && (
        <Box
          sx={{
            width: "100%",
            marginTop: 1,
            // display: hidden ? "none" : "flex",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickConfirm(teamId)}
            sx={{ width: "100%", padding: "10px", borderRadius: 0 }}
          >
            我确认能打！
          </Button>
        </Box>
      )}
      {team && team.inTeam && !team.confirmed && (
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
            有事打不了！
          </Button>
        </Box>
      )}
    </>
  );
};

export default TeamDetailPage;
