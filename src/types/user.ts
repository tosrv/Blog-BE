import { RegisterDTO } from "./auth";

export type UpdateUserDTO = Pick<RegisterDTO, "email" | "name">;
