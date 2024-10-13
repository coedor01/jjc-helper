import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper, SxProps, Theme } from "@mui/material";
import TeamInfo from "./teamInfo";

interface WeekItemOtherQueries {
  dateStartTs: number;
  dateEndTs: number;
}
interface WeekItem {
  label: string;
  queries: WeekItemOtherQueries;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const weekArr: WeekItem[] = [];
  for (let i = 0; i < count; i++) {
    const targetDay = currentDay + i;
    let nextWeek = Math.floor(targetDay / 7);
    if (currentDay === 0 && targetDay != currentDay) {
      nextWeek++;
    }
    const day = targetDay % 7;
    const dateStart = new Date();
    const dateEnd = new Date();
    dateStart.setDate(currentDate.getDate() + i);
    dateEnd.setDate(currentDate.getDate() + i + 1);

    weekArr.push({
      label: "下".repeat(nextWeek) + weekChinese[day],
      queries: {
        dateStartTs: dateStart.getTime(),
        dateEndTs: dateEnd.getTime(),
      },
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function HomeMain() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const weekArr = getWeekArr();

  console.log(JSON.stringify(weekArr));

  return (
    <>
      <Paper sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
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
              label={item.label}
              sx={{
                flex: 1,
                fontSize: 12,
                padding: "2px",
                minWidth: "50px",
                minHeight: "none",
              }}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Paper>
      {weekArr.map((item, index) => (
        <CustomTabPanel
          key={index}
          value={value}
          index={index}
          sx={{
            zIndex: 10,
            paddingTop: "50px",
          }}
        >
          <TeamInfo />
        </CustomTabPanel>
      ))}
    </>
  );
}
