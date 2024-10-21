// components/ClientLayout.tsx
"use client";

import { useEffect } from "react";
import { SnackbarProvider } from "../snackbarProvider";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch("/version.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        localStorage.setItem("publicVersion", data.publicVersion);
      } catch (error) {
        console.error("Failed to fetch version:", error);
      }
    };

    fetchVersion();
  }, []);
  return <SnackbarProvider>{children}</SnackbarProvider>;
};

export default ClientLayout;
