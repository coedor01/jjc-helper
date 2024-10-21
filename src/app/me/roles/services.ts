import { fetchUserByEmail } from "@/app/core/v1/services";
import prisma from "@/client";
import { Role } from "./schemas";

export async function fetchMyRoles(email: string): Promise<Role[]> {
  const user = await fetchUserByEmail(prisma, email);
  if (user) {
    const items = await prisma.gameRole.findMany({
      select: {
        id: true,
        name: true,
        server: {
          select: {
            name: true,
          },
        },
        xf: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
      where: {
        userId: user.id,
      },
    });

    return items.map((item) => ({
      id: item.id,
      name: `${item.xf.name}·${item.name}·${item.server.name}`,
      icon: item.xf.icon,
    }));
  } else {
    return [];
  }
}
