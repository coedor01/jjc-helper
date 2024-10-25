"use client";

import useRoutes from "@/hooks/useRoutes";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const routes = useRoutes();

  const handleClickItem = (href: string) => {
    router.push(href);
  };

  const router = useRouter();
  return (
    <div className="btm-nav btm-nav-md">
      {routes.map((item, index) => (
        <button
          key={index}
          className={clsx(item.active && "active")}
          onClick={() => handleClickItem(item.href)}
        >
          <p>{item.label}</p>
        </button>
      ))}
    </div>
  );
}
