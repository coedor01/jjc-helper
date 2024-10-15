"use client";

import * as React from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper, SxProps, Theme } from "@mui/material";

import { ContextProvider } from "./context";
import { DEFAULT_QUERIES } from "./const";
import TeamInfo from "./components/teamInfo";
import OperationBar from "./components/operationBar";
import FilterDrawer from "./components/filterDrawer";
import { ROOT_PATH } from "../const";
import useQueryHook from "@/hooks/query";


interface WeekItem {
  label: string;
  value: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
  sx: SxProps<Theme>;
}

function getWeekArr(count: number = 7): WeekItem[] {
  const weekChinese: string[] = [
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
  ];
  const now = new Date();
  const currentDay = now.getDay();

  const weekArr: WeekItem[] = [];
  for (let i = 0; i < count; i++) {
    const targetDay = currentDay + i;
    let nextWeek = Math.floor(targetDay / 7);
    const day = targetDay % 7;
    if (currentDay === 0 && targetDay != currentDay) {
      nextWeek++;
    } else if (currentDay !== 0 && day === 0) {
      nextWeek--;
    }

    const [y, m, d] = [now.getFullYear(), now.getMonth() + 1, now.getDate() + i];

    weekArr.push({
      label: "下".repeat(nextWeek) + weekChinese[day],
      value: `${y}-${m}-${d}`,
    });
  }

  return weekArr;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, sx } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={sx}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


export default function TeamsOfDate({ params }: { params: { date: string } }) {
  const {
    searchParams,
    upsertMultiQueryString,
  } = useQueryHook()
  const pathname = usePathname();
  if (searchParams.toString() === "") {
    const params = upsertMultiQueryString(DEFAULT_QUERIES);
    redirect(pathname + "?" + params);
  }

  const weekArr = getWeekArr();
  console.log(JSON.stringify(weekArr));

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(`${ROOT_PATH}/${newValue}?${searchParams.toString()}`)
  };

  return (
    <ContextProvider>
      <Box>
        <Paper sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={params.date}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              backgroundColor: "#FFFFFF",
              height: "50px",
              alignItems: "center",
            }}
          >
            {weekArr.map((item, index) => (
              <Tab
                key={index}
                value={item.value}
                label={item.label}
                sx={{
                  flex: 1,
                  fontSize: 12,
                  padding: "2px",
                  minWidth: "50px",
                  minHeight: "none",
                }}
                {...a11yProps(item.value)}
              />
            ))}
          </Tabs>
        </Paper>

        {weekArr.map((item, index) => (
          <CustomTabPanel
            key={index}
            value={params.date}
            index={item.value}
            sx={{
              paddingTop: "50px",
              zIndex: 10,
            }}
          >
            <TeamInfo />
          </CustomTabPanel>
        ))}

      </Box>
      <OperationBar />
      <FilterDrawer />

    </ContextProvider>
  );
}
