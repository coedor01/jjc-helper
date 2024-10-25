"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper, SxProps, Theme } from "@mui/material";
import { redirect, usePathname, useRouter } from "next/navigation";
import useQueryHook from "@/hooks/query";
import { DEFAULT_QUERIES, SchedulesQueries } from "../const";
import { ROOT_PATH } from "../const";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string | null;
  sx: SxProps<Theme>;
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

  const statusArr = [
    { label: "组队中", value: "0" },
    { label: "待确认", value: "1" },
    { label: "就绪", value: "2" },
  ];
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const params = upsertQueryString(SchedulesQueries.STATUS, newValue);
    router.push(`${ROOT_PATH}?${params}`);
  };

  return (
    <Box sx={sx}>
      <Paper elevation={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={searchParams.get("status")}
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
          {statusArr.map((item, index) => (
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

      {statusArr.map((item, index) => (
        <CustomTabPanel
          key={index}
          value={searchParams.get("status")}
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
