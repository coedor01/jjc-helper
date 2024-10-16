"use client";

import OperationBar from "./components/OperationBar";

interface Props {
  params: { date: string };
  searchParams: { teamType: string, clientType: string };
}
const TeamsOfDateFilter: React.FC<Props> = ({
  params,
  searchParams,
}) => {
  return (<OperationBar params={params} searchParams={searchParams} />)
};

export default TeamsOfDateFilter