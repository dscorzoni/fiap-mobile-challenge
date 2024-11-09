import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import InputText from "@/components/InputText";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "@/contexts/auth";
import RadioGroup from "@/components/Radio/RadioGroup";
import { useState } from "react";
import { Role } from "@/types";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<Role | undefined>();

  const { handleRegister, isLoading } = useAuthContext();

  const handleValueChange = (value: string) => {
    setRole(value as Role);
  };

  const handleSubmit = async () => {
    if (username && email && password && confirmPassword && role) {
      handleRegister(username, email, password, confirmPassword, role);
    } else {
      Alert.alert(
        "Preenchimento inválido",
        "Preencha todos os campos para continuar"
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="dark" />
      <Header name="Registre-se" />
      <Ionicons name="person-add-outline" size={150} style={styles.icon} />
      <InputText
        placeholder="Digite seu nome de usuário"
        onChange={setUsername}
      />
      <InputText placeholder="Digite seu email" onChange={setEmail} />
      <InputText
        isPassword
        placeholder="Digite sua senha"
        onChange={setPassword}
      />
      <InputText
        isPassword
        placeholder="Confirme sua senha"
        onChange={setConfirmPassword}
      />
      <Text style={styles.radioTitle}>Selecione um perfil:</Text>
      <RadioGroup
        options={[
          { label: "Aluno", value: "student" },
          { label: "Professor", value: "teacher" },
          { label: "Admin", value: "admin" },
        ]}
        onValueChange={handleValueChange}
      />

      <View style={{ padding: 16 }} />
      <Button
        title={isLoading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleSubmit}
        isDisabled={isLoading}
      />
      <Button
        title="Voltar"
        styleType="secondary"
        onPress={() => router.push("/")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  icon: {
    color: Colors.primary,
    padding: 16,
    marginTop: 60,
  },
  forgotPassword: {
    width: "85%",
    textAlign: "right",
    paddingTop: 16,
    textDecorationLine: "underline",
  },
  radioTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.black,
    marginHorizontal: "auto",
    marginTop: 12,
  },
});
