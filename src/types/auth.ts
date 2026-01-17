export type RegisterDTO = {
  email: string;
  name: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export interface UserPayload {
  id: number;
  role: string;
}
