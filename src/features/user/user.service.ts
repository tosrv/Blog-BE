import AppError from "../../utils/error";
import {
  deleteUserById,
  getPassword,
  getUserById,
} from "../user/user.repository";
import { userUpdate } from "./user.repository";
import { UpdateUserDTO } from "../../types/user";
import bcrypt from "bcrypt";

export async function requireUser(userId: number) {
  const user = await getUserById(userId);
  if (!user) throw new AppError(400, "User not found");
  return user;
}

// Get user
export async function getUser(userId: number) {
  return await requireUser(userId);
}

// Update user
export async function updateUser(userId: number, user: UpdateUserDTO) {
  await requireUser(userId);
  return await userUpdate(userId, user);
}

// Delete user
export async function deleteUser(userId: number, password: string) {
  await requireUser(userId);

  const user = await getPassword(userId);

  const match = await bcrypt.compare(password, user!.password);
  if (!match) throw new AppError(401, "Password incorrect");

  await deleteUserById(userId);
}
