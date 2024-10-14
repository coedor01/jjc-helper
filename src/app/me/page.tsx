import SideBar from "@/app/components/sideBar";
import { routes } from "../const";

export default function Me() {
  return (
    <SideBar
      routes={routes}
      currentRoute="/me"
    />
  )
}