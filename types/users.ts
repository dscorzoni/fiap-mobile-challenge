import { Role } from "./global";

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  role: Role | null;
}
