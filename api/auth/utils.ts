import { Role, User } from "@/types";
import { jwtDecode } from "jwt-decode";

interface MyJWTPayload {
  sub: string;
  email: string;
  username: string;
  roles: Role;
  exp: number; 
}

export const decodeJWT = (token: string): MyJWTPayload | null => {
  try {
    const decoded = jwtDecode<MyJWTPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export const getUserFromJWT = (token: string): User | null => {
  const decoded = decodeJWT(token);
  if (decoded) {
    return ({
      id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      role: decoded.roles,
    })
  } else {
    console.error("Invalid JWT token");
    return null;
  }
}

