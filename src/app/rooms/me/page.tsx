import { getMyRoom } from "./actions";

export default async function MyRoomPage() {
  const room = await getMyRoom();
  return (
    <>
      {room && <>MyRoomPage: No.{room.id}</>}
      {!room && <>MyRoomPage: Null</>}
    </>
  );
}
