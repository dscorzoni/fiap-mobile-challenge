import { Role, User } from "@/types";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  sub: string;
  email: string;
  username: string;
  roles: Role;
  exp: number; 
}

export const extractAccessToken = (response: any): string | null => {
  const setCookieHeader = response.headers['set-cookie']
  if (!setCookieHeader || typeof setCookieHeader !== 'object') {
    return null
  }

  for (const key in setCookieHeader) {
    if (setCookieHeader.hasOwnProperty(key)) {
      const cookie = setCookieHeader[key]
      if (cookie.includes('access_token=')) {
        const token = cookie
          .split(';')
          .find((item: string) => item.trim().startsWith('access_token='))
        if (token) {
          return token.split('=')[1]
        }
      }
    }
  }

  return null
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
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

