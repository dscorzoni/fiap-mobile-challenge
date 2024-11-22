import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import InputText from "@/components/InputText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { useAuthContext } from "@/contexts/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, isLoading } = useAuthContext();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header name="Bem-vindo!" />
      <Ionicons name="person-circle-outline" size={150} style={styles.icon} />
      <InputText
        onChange={setEmail}
        value={email}
        placeholder="Digite seu nome de usuário"
      />
      <InputText
        onChange={setPassword}
        value={password}
        isPassword
        placeholder="Digite sua senha"
      />
      <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      <View style={{ padding: 16 }} />
      <Button
        title={isLoading ? "Entrando..." : "Entrar"}
        onPress={() => handleLogin(email, password)}
        isDisabled={isLoading}
      />
      <Button
        title="Voltar"
        styleType="secondary"
        onPress={() => router.push("/")}
        isDisabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    color: Colors.primary,
    paddingBottom: 16,
  },
  forgotPassword: {
    paddingTop: 10,
    textDecorationLine: "underline",
    marginLeft: "auto",
  },
});
