import { prisma } from "../../prisma/client";
import { UpdateUserDTO } from "../../types/user";

// Get user data
export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
    },
  });
}

// Update user
export async function userUpdate(id: number, user: UpdateUserDTO) {
  return await prisma.user.update({
    where: { id: id },
    data: {
      name: user.name,
      email: user.email,
    },
    select: {
      name: true,
      email: true,
    },
  });
}

// Delete user
export async function deleteUserById(id: number) {
  await prisma.$transaction([
    prisma.post.deleteMany({ where: { authorId: id } }),
    prisma.user.delete({ where: { id: id } }),
  ]);
}

// Get Password
export async function getPassword(id: number) {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      password: true,
    },
  });
}
