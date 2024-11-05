import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useContext,
} from "react";

import { Role, User } from "@/types";
import { createUser, handleLogin, logout } from "@/api/auth/authService";
import { getUserFromJWT } from "@/api/auth/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onRegister: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: Role
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkLoginStatus = useCallback(async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    if (token) {
      const u = getUserFromJWT(token);
      setUser(u);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const onLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await handleLogin(email, password);
      await checkLoginStatus();
    } catch (err) {
      setError("Erro ao logar");
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
      setError(null);
    } catch (error) {
      setError("Erro ao sair");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: Role
  ) => {
    setIsLoading(true);
    try {
      await createUser({
        username,
        email,
        password,
        confirmPassword,
        role,
      });
      setError(null);
    } catch (error) {
      setError("Erro ao cadastrar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a UserProvider");
  }
  return context;
};
