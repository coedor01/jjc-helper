import { getServerSession } from "next-auth";
import NavBar from "@/app/components/navBar";
import CenteredLoginPrompt from "@/app/components/centeredLoginPrompt";
import { toQueryString } from "../utils";
import BottomNav from "../components/bottomNav";

export default async function MePage() {
  const session = await getServerSession();
  return (
    <>
      <NavBar title="我的信息" showBack={false} />
      {session && (
        <CenteredLoginPrompt
          jumpUrl={
            "/auth/login" +
            "?" +
            toQueryString({
              callbackUrl: "/me",
            })
          }
        />
      )}
      <BottomNav />
    </>
  );
}
