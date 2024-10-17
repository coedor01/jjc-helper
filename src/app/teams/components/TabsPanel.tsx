"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper, SxProps, Theme } from "@mui/material";
import { redirect, usePathname, useRouter } from "next/navigation";
import useQueryHook from "@/hooks/query";
import { DEFAULT_QUERIES, TeamsQueries } from "../const";
import { ROOT_PATH } from "../const";

interface WeekItem {
  label: string;
  value: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string | null;
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

    const [y, m, d] = [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate() + i,
    ];

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

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const TabsPanel: React.FC<Props> = ({ children, sx }) => {
  const { searchParams, upsertQueryString, upsertMultiQueryString } =
    useQueryHook();

  const pathname = usePathname();
  if (searchParams.toString() === "") {
    const params = upsertMultiQueryString(DEFAULT_QUERIES);
    redirect(pathname + "?" + params);
  }

  const weekArr = getWeekArr();
  console.log(JSON.stringify(weekArr));

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const params = upsertQueryString(TeamsQueries.DATE, newValue);
    router.push(`${ROOT_PATH}?${params}`);
  };

  return (
    <Box sx={sx}>
      <Paper elevation={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={searchParams.get("date")}
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
          value={searchParams.get("date")}
          index={item.value}
          sx={{
            margin: "50px 0 80px 0",
            zIndex: 10,
          }}
        >
          {children}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default TabsPanel;
