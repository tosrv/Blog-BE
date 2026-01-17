import AppError from "../../utils/error";
import { signToken } from "../../utils/jwt";
import { addUser, loginData } from "./auth.repository";
import bcrypt from "bcrypt";
import { LoginDTO, RegisterDTO } from "../../types/auth";

// Register
export async function createUser(userData: RegisterDTO) {
  const hashPass = await bcrypt.hash(userData.password, 10);
  await addUser({
    email: userData.email,
    name: userData.name,
    password: hashPass,
  });
}

// Login
export async function loginUser(userLogin: LoginDTO) {
  const user = await loginData({ email: userLogin.email });

  if (!user) throw new AppError(400, "Invalid email or password");

  const match = await bcrypt.compare(userLogin.password, user.password);

  if (!match) throw new AppError(400, "Invalid email or password");

  const { id, role } = user;
  return signToken({ id, role });
}
