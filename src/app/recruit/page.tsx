"use client";

import clsx from "clsx";
import BottomNav from "../components/bottomNav";
import { useState } from "react";

export default function RecruitPage() {
  const [currentTabValue, setCurrentTabValue] = useState<string>("ALL");
  const tabs = [
    { label: "全部", value: "ALL" },
    { label: "即时", value: "NOW" },
    { label: "计划", value: "SCHEDULE" },
    { label: "订阅", value: "SUBSCRIBED" },
  ];

  const [currentSubTabValue, setCurrentSubTabValue] =
    useState<string>("2024-10-26");
  const subTabs = [
    { labels: ["今天"], value: "2024-10-25" },
    { labels: ["10/26", "星期六"], value: "2024-10-26" },
    { labels: ["10/27", "星期日"], value: "2024-10-27" },
    { labels: ["10/28", "星期一"], value: "2024-10-28" },
    { labels: ["10/29", "星期二"], value: "2024-10-29" },
    { labels: ["10/30", "星期三"], value: "2024-10-30" },
    { labels: ["10/31", "星期四"], value: "2024-10-40" },
  ];

  return (
    <>
      <div className="fixed top-0 w-full">
        <div role="tablist" className="tabs tabs-lifted">
          {tabs.map((item, index) => (
            <a
              key={index}
              role="tab"
              className={clsx(
                "tab text-sm",
                item.value === currentTabValue && "tab-active"
              )}
              onClick={() => setCurrentTabValue(item.value)}
            >
              {item.label}
            </a>
          ))}
        </div>
        {currentTabValue === "ALL" && (
          <div className=" w-full h-10 bg-white flex overflow-x-auto overscroll-contain items-center no-scrollbar">
            {subTabs.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  "w-16 h-9 shrink-0 inline-flex flex-col items-center justify-center ml-1 mr-1 rounded-md text-xs",
                  item.value === currentSubTabValue &&
                    "bg-orange-100 border-orange-200 text-orange-800 font-medium"
                )}
                onClick={() => setCurrentSubTabValue(item.value)}
              >
                {item.labels.map((label, index) => (
                  <span key={index}>{label}</span>
                ))}
              </div>
            ))}
            {/* <div
            className={clsx(
              "w-16 h-9 shrink-0 inline-flex items-center justify-center ml-1 mr-1 rounded-md text-sm",
              false &&
                "bg-orange-100 border-orange-200 text-orange-800 font-medium border-2"
            )}
          >
            今天
          </div>
          <div
            className={clsx(
              "w-16 h-9 shrink-0 inline-flex flex-col items-center justify-center ml-1 mr-1 rounded-md text-xs text-gray-500",
              true &&
                "bg-orange-100 border-orange-200 text-orange-800 font-medium border-2"
            )}
          >
            <span>10/26</span>
            <span>星期六</span>
          </div>
          <div className="w-16 h-10 shrink-0 inline-flex flex-col items-center justify-center ml-1 mr-1 rounded-md text-xs text-gray-500">
            <span>10/27</span>
            <span>星期日</span>
          </div>
          <div className="w-16 h-10 shrink-0 inline-flex flex-col items-center justify-center ml-1 mr-1 rounded-md text-xs text-gray-500">
            <span>10/28</span>
            <span>星期一</span>
          </div>
          <div className="w-16 h-10 shrink-0  inline-flex flex-col items-center justify-center ml-1 mr-1 rounded-md text-xs text-gray-500">
            <span>10/29</span>
            <span>星期二</span>
          </div>
          <div className="w-16 h-10 shrink-0  inline-flex flex-col items-center justify-center ml-1 mr-1 rounded-md text-xs text-gray-500">
            <span>10/30</span>
            <span>星期三</span>
          </div>
          <div className="w-16 h-10 shrink-0  inline-flex flex-col items-center justify-center ml-1 mr-1 rounded-md text-xs text-gray-500">
            <span>10/31</span>
            <span>星期四</span>
          </div> */}
          </div>
        )}
      </div>

      {/* <BottomNav /> */}
    </>
  );
}
