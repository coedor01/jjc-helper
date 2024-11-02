import { useMemo } from "react";
import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "首页",
        href: "/home",
        active: pathname === "/home",
      },
      {
        label: "招募",
        href: "/recruit",
        active: pathname === "/recruit",
      },
      {
        label: "角色",
        href: "/roles",
        active: pathname === "/roles",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
