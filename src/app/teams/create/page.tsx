"use client";

import { createTeam } from "@/app/axios/localServices";
import NavBar from "@/app/components/navBar";
import { useSnackbar } from "@/app/components/snackbarProvider";
import { RoleOut } from "@/app/core/v1/schemas";
import { getSTimestamp, weekDayFormat } from "@/app/utils";
import useDebounce from "@/hooks/debounce";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ClientType, TeamType } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const TeamCreate: React.FC = () => {
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
  const [teamTypes, setTeamTypes] = useState<TeamType[]>([]);
  const [gameRoles, setGameRoles] = useState<RoleOut[]>([]);

  const fetchClientTypes = async () => {
    const res = await fetch("/api/clientTypes");
    const body = await res.json();
    if (body.ok) {
      setClientTypes(body.data);
    }
  };

  const fetchTeamTypes = async () => {
    const res = await fetch("/api/teamTypes");
    const body = await res.json();
    if (body.ok) {
      setTeamTypes(body.data);
    }
  };

  const fetchGameRoles = async () => {
    const res = await fetch("/api/roles");
    const body = await res.json();
    if (body.ok) {
      setGameRoles(body.data);
    }
  };

  useEffect(() => {
    fetchClientTypes();
    fetchTeamTypes();
    fetchGameRoles();
  }, []);

  const confirmAdvancedMinutesSelectList = [
    { label: "提前30分钟", value: 30 },
    { label: "提前60分钟", value: 60 },
    { label: "提前90分钟", value: 90 },
  ];
  const now = new Date();
  const [fullYear, month, day] = [
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ];
  const dateList = [
    {
      label: weekDayFormat(now.getDay(), 0),
      value: getSTimestamp(new Date(fullYear, month, day + 0)),
    },
    {
      label: weekDayFormat(now.getDay(), 1),
      value: getSTimestamp(new Date(fullYear, month, day + 1)),
    },
    {
      label: weekDayFormat(now.getDay(), 2),
      value: getSTimestamp(new Date(fullYear, month, day + 2)),
    },
    {
      label: weekDayFormat(now.getDay(), 3),
      value: getSTimestamp(new Date(fullYear, month, day + 3)),
    },
    {
      label: weekDayFormat(now.getDay(), 4),
      value: getSTimestamp(new Date(fullYear, month, day + 4)),
    },
    {
      label: weekDayFormat(now.getDay(), 5),
      value: getSTimestamp(new Date(fullYear, month, day + 5)),
    },
    {
      label: weekDayFormat(now.getDay(), 6),
      value: getSTimestamp(new Date(fullYear, month, day + 6)),
    },
    {
      label: weekDayFormat(now.getDay(), 7),
      value: getSTimestamp(new Date(fullYear, month, day + 7)),
    },
  ];
  const timeList = [
    { label: "00:00", value: 3600 * 0 },
    { label: "12:00", value: 3600 * 12 },
    { label: "13:00", value: 3600 * 13 },
    { label: "14:00", value: 3600 * 14 },
    { label: "15:00", value: 3600 * 15 },
    { label: "16:00", value: 3600 * 16 },
    { label: "18:00", value: 3600 * 18 },
    { label: "19:00", value: 3600 * 19 },
    { label: "21:00", value: 3600 * 21 },
    { label: "22:00", value: 3600 * 22 },
    { label: "23:00", value: 3600 * 23 },
  ];
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
    const date = Number(formData.get("date")) as number;
    const time = Number(formData.get("time")) as number;
    const clientTypeId = Number(formData.get("clientType")) as number;
    const teamTypeId = Number(formData.get("teamType")) as number;
    const confirmAdvancedMinutes = Number(
      formData.get("confirmAdvancedMinutes")
    ) as number;
    const currentScore = Number(formData.get("currentScore")) as number;
    const maxScore = Number(formData.get("maxScore")) as number;
    const playDuration = Number(formData.get("playDuration")) as number;
    const gameRoleId = Number(formData.get("gameRole")) as number;
    if (
      clientTypeId &&
      teamTypeId &&
      confirmAdvancedMinutes &&
      currentScore &&
      maxScore &&
      playDuration &&
      gameRoleId
    ) {
      try {
        const res = await createTeam({
          startAt: date + time,
          confirmAdvancedMinutes,
          clientTypeId,
          teamTypeId,
          member: {
            currentScore,
            maxScore,
            playDuration,
            gameRoleId,
          },
        });
        if (res.data.ok) {
          showSnackbar("创建成功");
          const callbackUrl = searchParams.get("callbackUrl");
          if (callbackUrl) {
            router.push(callbackUrl);
          } else {
            router.push("/me");
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
  const [clientType, setClientType] = useState("");
  const handleClientTypeChange = (event: SelectChangeEvent) => {
    setClientType(event.target.value as string);
  };
  const [teamType, setTeamType] = useState("");
  const handleTeamTypeChange = (event: SelectChangeEvent) => {
    setTeamType(event.target.value as string);
  };
  const [confirmAdvancedMinutes, setConfirmAdvancedMinutes] = useState("");
  const handleConfirmAdvancedMinutesChange = (event: SelectChangeEvent) => {
    setConfirmAdvancedMinutes(event.target.value as string);
  };
  const [date, setDate] = useState("");
  const handleDateChange = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };
  const [time, setTime] = useState("");
  const handleTimeChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
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

  return (
    <>
      <NavBar title="创建队伍" />
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
              <InputLabel id="clientTypeLabel">客户端</InputLabel>
              <Select
                labelId="clientTypeLabel"
                id="clientType"
                name="clientType"
                value={clientType}
                label="clientType"
                onChange={handleClientTypeChange}
              >
                {clientTypes.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              required
              fullWidth
              sx={{
                margin: "5px 0",
              }}
            >
              <InputLabel id="teamTypeLabel">招募类型</InputLabel>
              <Select
                labelId="teamTypeLabel"
                id="teamType"
                name="teamType"
                value={teamType}
                label="teamType"
                onChange={handleTeamTypeChange}
              >
                {teamTypes.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              required
              fullWidth
              sx={{
                margin: "5px 0",
              }}
            >
              <InputLabel id="dateLabel">日期</InputLabel>
              <Select
                labelId="dateLabel"
                id="date"
                name="date"
                value={date}
                label="date"
                onChange={handleDateChange}
              >
                {dateList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              required
              fullWidth
              sx={{
                margin: "5px 0",
              }}
            >
              <InputLabel id="timeLabel">时间</InputLabel>
              <Select
                labelId="timeLabel"
                id="time"
                name="time"
                value={time}
                label="time"
                onChange={handleTimeChange}
              >
                {timeList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              required
              fullWidth
              sx={{
                margin: "5px 0",
              }}
            >
              <InputLabel id="confirmAdvancedMinutesLabel">确认时间</InputLabel>
              <Select
                labelId="confirmAdvancedMinutesLabel"
                id="confirmAdvancedMinutes"
                name="confirmAdvancedMinutes"
                value={confirmAdvancedMinutes}
                label="confirmAdvancedMinutes"
                onChange={handleConfirmAdvancedMinutesChange}
              >
                {confirmAdvancedMinutesSelectList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider sx={{ margin: "10px 0" }} />
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
                onChange={useDebounce(handleCurrentScoreChange, 500)}
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
                onChange={useDebounce(handleMaxScoreChange, 500)}
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
            {loading ? "创建中..." : "创建"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TeamCreate;
