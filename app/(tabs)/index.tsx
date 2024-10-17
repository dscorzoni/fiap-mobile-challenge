import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import Header from "@/components/Header";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

export default function Index() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#febe71', '#a95d00']} style={styles.background} />
      <Header name="Escola CMS" />
      <Text style={styles.text}>Insira seu usuário e sua senha abaixo para prosseguir:</Text>
      <InputText placeholder="Insira aqui seu nome de usuário" isPassword={false} />
      <InputText placeholder="Insira aqui sua senha" isPassword={true} />
      <View style={{margin: 20}} />
      <Button title="Login" styleType="primary" />
      <Button title="Novo Usuário" styleType="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "light",
    marginBottom: 30,
    paddingHorizontal: 50
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})