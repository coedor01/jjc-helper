"use client";

import { createTeamMember } from "@/app/axios/localServices";
import CenteredLoginPrompt from "@/app/components/centeredLoginPrompt";
import NavBar from "@/app/components/navBar";
import { useSnackbar } from "@/app/components/snackbarProvider";
import { RoleOut } from "@/app/core/v1/schemas";
import { toQueryString } from "@/app/utils";
import useDebounce from "@/hooks/debounce";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

const JoinTeamPage: React.FC<Props> = ({ params }) => {
  const teamId = Number(params.id) as number;
  const [gameRoles, setGameRoles] = useState<RoleOut[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [dataFetching, setDataFetching] = useState<boolean>(true);

  const fetchGameRoles = async () => {
    const res = await fetch("/api/roles");
    const body = await res.json();
    if (body.ok) {
      setGameRoles(body.data);
    }
    setDataFetching(false);
  };

  const fetchSession = async () => {
    const session = await getSession();
    setSession(session);
  };

  useEffect(() => {
    fetchGameRoles();
    fetchSession();
  }, []);

  const playDurationList = [
    { label: "1小时", value: 1 * 60 },
    { label: "2小时", value: 2 * 60 },
    { label: "3小时", value: 3 * 60 },
    { label: "4小时", value: 4 * 60 },
    { label: "5小时", value: 5 * 60 },
    { label: "6小时", value: 6 * 60 },
  ];

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showSnackbar, showClientErrorSnackBar, showServerErrorSnackBar } =
    useSnackbar();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    setLoading(true);

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const currentScore = Number(formData.get("currentScore")) as number;
    const maxScore = Number(formData.get("maxScore")) as number;
    const playDuration = Number(formData.get("playDuration")) as number;
    const gameRoleId = Number(formData.get("gameRole")) as number;
    if (currentScore && maxScore && playDuration && gameRoleId) {
      try {
        const res = await createTeamMember(teamId, {
          currentScore,
          maxScore,
          playDuration,
          gameRoleId,
        });
        if (res.data.ok) {
          showSnackbar("创建成功");
          const callbackUrl = searchParams.get("callbackUrl");
          if (callbackUrl) {
            router.replace(callbackUrl);
          } else {
            router.replace("/teams");
          }
        } else {
          showClientErrorSnackBar(res.data.error);
        }
      } catch {
        showServerErrorSnackBar();
      }
    }

    setLoading(false);
  };
  const [gameRole, setGameRole] = useState("");
  const handleGameRoleChange = (event: SelectChangeEvent) => {
    setGameRole(event.target.value as string);
  };
  const [playDuration, setPlayDuration] = useState("");
  const handlePlayDurationChange = (event: SelectChangeEvent) => {
    setPlayDuration(event.target.value as string);
  };

  const [maxScoreError, setMaxScoreError] = useState<boolean>(true);
  const [maxScoreErrorText, setMaxScoreErrorText] = useState<string>("");
  const handleMaxScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const maxScoreRegex = /^\d+(\.\d+)?$/;

    if (!maxScoreRegex.test(value)) {
      setMaxScoreError(true);
      setMaxScoreErrorText("需要填入大于或等于0的整数");
    } else {
      setMaxScoreError(false);
      setMaxScoreErrorText("");
    }
  };
  const debouncedHandleMaxScoreChange = useDebounce(handleMaxScoreChange, 500);

  const [currentScoreError, setCurrentScoreError] = useState<boolean>(true);
  const [currentScoreErrorText, setCurrentScoreErrorText] =
    useState<string>("");
  const handleCurrentScoreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const currentScoreRegex = /^\d+(\.\d+)?$/;

    if (!currentScoreRegex.test(value)) {
      setCurrentScoreError(true);
      setCurrentScoreErrorText("需要填入大于或等于0的整数");
    } else {
      setCurrentScoreError(false);
      setCurrentScoreErrorText("");
    }
  };
  const debouncedHandleCurrentScoreChange = useDebounce(
    handleCurrentScoreChange,
    500
  );

  const pathname = usePathname();
  const onClickCreate = () => {
    router.replace(
      "/me/roles/create" +
        "?" +
        toQueryString({
          callbackUrl: pathname,
        })
    );
  };

  return (
    <>
      <NavBar title="加入队伍" />
      {!dataFetching && session && gameRoles.length > 0 && (
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              marginTop: "5px",
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <Box
              sx={{
                p: 1,
              }}
            >
              <FormControl
                required
                fullWidth
                sx={{
                  margin: "5px 0",
                }}
              >
                <InputLabel id="gameRoleLabel">角色</InputLabel>
                <Select
                  labelId="gameRoleLabel"
                  id="gameRole"
                  name="gameRole"
                  value={gameRole}
                  label="gameRole"
                  onChange={handleGameRoleChange}
                >
                  {gameRoles.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                required
                sx={{
                  margin: "5px 0",
                  width: "100%",
                }}
                error={currentScoreError}
              >
                <TextField
                  required
                  id="currentScore"
                  name="currentScore"
                  label="当前分"
                  variant="outlined"
                  onChange={debouncedHandleMaxScoreChange}
                  error={currentScoreError && currentScoreErrorText !== ""}
                  helperText={currentScoreErrorText}
                  sx={{ width: "100%" }}
                />
              </FormControl>
              <FormControl
                required
                sx={{
                  margin: "5px 0",
                  width: "100%",
                }}
                error={currentScoreError}
              >
                <TextField
                  required
                  id="maxScore"
                  name="maxScore"
                  label="最高分"
                  variant="outlined"
                  onChange={debouncedHandleCurrentScoreChange}
                  error={maxScoreError && maxScoreErrorText !== ""}
                  helperText={maxScoreErrorText}
                  sx={{ width: "100%" }}
                />
              </FormControl>
              <FormControl
                required
                fullWidth
                sx={{
                  margin: "5px 0",
                }}
              >
                <InputLabel id="playDurationLabel">能玩多久</InputLabel>
                <Select
                  labelId="playDurationLabel"
                  id="playDuration"
                  name="playDuration"
                  value={playDuration}
                  label="playDuration"
                  onChange={handlePlayDurationChange}
                >
                  {playDurationList.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "5px",
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              sx={{ width: "100%", padding: "10px 0", borderRadius: 0 }}
            >
              {loading ? "加入中..." : "加入"}
            </Button>
          </Box>
        </Box>
      )}
      {!dataFetching && session && gameRoles.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          sx={{
            padding: 2,
          }}
        >
          <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
            您当前没有绑定游戏角色
          </Typography>
          <Button
            variant="contained"
            onClick={onClickCreate}
            sx={{ width: "100%", maxWidth: 200 }}
          >
            去创建
          </Button>
        </Box>
      )}
      {!dataFetching && !session && (
        <CenteredLoginPrompt
          onLogin={() =>
            router.push(
              "/auth/login" +
                "?" +
                toQueryString({
                  callbackUrl: pathname + "?" + searchParams.toString(),
                })
            )
          }
        />
      )}
    </>
  );
};

export default JoinTeamPage;
