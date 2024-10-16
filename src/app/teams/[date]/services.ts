
import prisma from "@/client";
import { Team } from "@prisma/client";


interface TeamsQueries {
  startAtLeft: number,
  startAtRight: number,
  teamTypeIds: number[],
  clientTypeIds: number[],
}

export async function getTeams(
  { startAtLeft, startAtRight, teamTypeIds, clientTypeIds }: TeamsQueries
): Promise<Team[]> {

  const whereClauses = {
    teamTypeId: {
      in: teamTypeIds,
    },
    clientTypeId: {
      in: clientTypeIds,
    },
    startAt: {
      gte: startAtLeft,
      lt: startAtRight,
    }
  };

  console.log(`whereClauses=${JSON.stringify(whereClauses)}`);

  const items = await prisma.team.findMany({
    where: whereClauses
  })

  return items

} 