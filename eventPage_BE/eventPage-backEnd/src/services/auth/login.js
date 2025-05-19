import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const login = async (username, password) => {
  const user = await prisma.user.findFirst({
    where: { username, password },
  });

  if (!user) return null;

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1d" }
  );

  return { token, userId: user.id }; // <-- Make sure to return both!
};

export default login;
