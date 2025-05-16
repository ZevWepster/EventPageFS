import { PrismaClient } from "@prisma/client";

const getEventById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({
    where: { id },
    include: { categories: true },
  });

  if (!event) return null;

  return {
    ...event,
    // categoryIds: event.categories.map((cat) => cat.id),
  };
};

export default getEventById;
