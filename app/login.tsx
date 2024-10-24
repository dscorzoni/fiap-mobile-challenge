import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import InputText from "@/components/InputText";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header name="Bem-vindo!" />
      <Ionicons name="person-circle-outline" size={150} style={styles.icon} />
      <InputText isPassword={false} placeholder="Digite seu nome de usuário" />
      <InputText isPassword={true} placeholder="Digite sua senha" />
      <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      <View style={{ padding: 16 }}/>
      <Button title="Login" styleType={"primary"} />
      <Button title="Voltar" styleType="secondary" onPress={ () => router.replace("/") } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: Colors.primary,
    padding: 16,
    marginBottom: 36
  },
  forgotPassword: {
    width: "85%",
    textAlign: "right",
    paddingTop: 16,
    textDecorationLine: "underline"
  }
})