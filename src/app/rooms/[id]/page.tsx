import Body from "./components/Body";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailPage({ params }: Props) {
  const id = (await params).id;
  return (
    <>
      <Body />
    </>
  );
}
