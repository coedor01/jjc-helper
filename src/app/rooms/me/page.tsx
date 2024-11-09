import { getMyRoom } from "./actions";
import Body from "./components/Body";

export default async function MyRoomPage() {
  const room = await getMyRoom();
  return (
    <>
      {room && <Body roomId={room.id} />}
      {!room && <>MyRoomPage: Null</>}
    </>
  );
}
