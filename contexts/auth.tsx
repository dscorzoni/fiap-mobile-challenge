import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useContext,
} from "react";

import { Role, User } from "@/types";
import { login, logout } from "@/api/auth/authService";
import { getUserFromJWT } from "@/api/utils/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import { createUser } from "@/api/user/userService";
import { ERROR_MESSAGE } from "@/api/utils/errors";

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRegister: (
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

  const decodeToken = useCallback(async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    if (token) {
      const loggedUser = getUserFromJWT(token);
      setUser(loggedUser);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    decodeToken();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    if (!password || !email) {
      setError(ERROR_MESSAGE.LOGIN_FAILED);
      Alert.alert(ERROR_MESSAGE.LOGIN_FAILED);
      return;
    }

    setIsLoading(true);

    const response = await login(email, password);

    if (response.success) {
      await decodeToken();
      router.push("/home/posts-list");
    } else {
      setError(response.error);
      Alert.alert(response.error, "Tente novamente");
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);

    const response = await logout();

    if (response.success) {
      setUser(null);
      setError(null);
      router.replace("/login");
      Alert.alert("Usuário deslogado");
    } else {
      setError(response.error);
      Alert.alert(response.error, "Tente novamente.");
    }

    setIsLoading(false);
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: Role
  ) => {
    if (password !== confirmPassword) {
      Alert.alert(
        "Senhas diferentes",
        "A senha e a confirmação de senha devem ser iguais."
      );
      setError("Senhas diferentes.");
      return;
    }

    setIsLoading(true);

    const response = await createUser({
      username,
      email,
      password,
      role,
    });

    if (response.success) {
      router.replace("/login");
      Alert.alert("Usuário cadastrado", "Faça o login para continuar");
      setError(null);
    } else {
      setError(response.error);
      Alert.alert(response.error, "Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        handleLogin,
        handleLogout,
        handleRegister,
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
