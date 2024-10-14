import SideBar from "@/app/components/sideBar";
import { routes } from "../const";

export default function Schedule() {
  return (
    <SideBar
      routes={routes}
      currentRoute="/schedule"
    />
  )
}