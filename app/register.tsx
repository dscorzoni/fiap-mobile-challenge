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
import { useHandleScroll } from "@/api/utils/handleScroll";

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

  const { handleScroll } = useHandleScroll();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
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
            { label: "Estudante", value: "student" },
            { label: "Professor", value: "teacher" },
            { label: "Admin", value: "admin" },
          ]}
          onValueChange={handleValueChange}
        />

        <View style={{ padding: 16 }} />
        <View style={{ gap: 10, width: "100%" }}>
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: Colors.primary,
    paddingBottom: 16,
  },
  radioTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.black,
    marginHorizontal: "auto",
    marginTop: 20,
  },
});
