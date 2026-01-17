import { prisma } from "../../prisma/client";
import { RegisterDTO } from "../../types/auth";

// Register
export async function addUser({ email, name, password }: RegisterDTO) {
  await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });
}

// Login
export async function loginData({ email }: { email: string }) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}
