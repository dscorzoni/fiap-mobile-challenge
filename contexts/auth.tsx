import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useContext,
} from "react";

import { Role, User } from "@/types";
import { login, logout } from "@/api/auth/authService";
import { getUserFromJWT } from "@/api/auth/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import { createUser } from "@/api/user/userService";

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
    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        await decodeToken();
        router.push("/home");
      } else {
        throw new Error();
      }
    } catch (err) {
      setError("Erro ao autenticar");
      Alert.alert("Erro ao autenticar", "Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const success = await logout();

      if (success) {
        setUser(null);
        setError(null);
        router.replace("/login");
        Alert.alert("Usuário deslogado");
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Erro ao sair");
      Alert.alert("Erro ao sair. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
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
        "A senha e a confirmação de senha devem ser as mesmas."
      );
      setError("Senhas diferentes.");
      return;
    }

    setIsLoading(true);

    try {
      const success = await createUser({
        username,
        email,
        password,
        role,
      });

      if (success) {
        router.replace("/login");
        Alert.alert("Usuário cadastrado", "Faça o login para continuar");
        setError(null);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Erro ao cadastrar");
      Alert.alert("Erro ao cadastrar. Tente novamente.");
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
