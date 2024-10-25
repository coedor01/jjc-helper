import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { weekDayFormat } from "@/app/utils";

function getWeekArr(count: number = 7): {
  label: string;
  value: string;
}[] {
  const now = new Date();
  const currentDay = now.getDay();

  const weekArr = [];
  for (let i = 0; i < count; i++) {
    const [y, m, d] = [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate() + i,
    ];

    weekArr.push({
      label: weekDayFormat(currentDay, i),
      value: `${y}-${m}-${d}`,
    });
  }

  return weekArr;
}

const useWeekDays = () => {
  const searchParams = useSearchParams();
  const weekArr = getWeekArr();

  const routes = useMemo(
    () =>
      weekArr.map((item) => ({
        active: searchParams.get("date") === item.value,
        ...item,
      })),
    [searchParams]
  );

  return routes;
};

export default useWeekDays;
