import { useMemo } from "react";
import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "大厅",
        href: "/teams",
        active: pathname === "/teams",
      },
      {
        label: "计划",
        href: "/schedules",
        active: pathname === "/schedules",
      },
      {
        label: "我的",
        href: "/me",
        active: pathname === "/me",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
