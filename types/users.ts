import { Role } from "./global";

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role | null;
}
