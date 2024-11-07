import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";
import UserList from "@/components/UserLIst";

export default function RedeStudent() {
  return (
    <View style={styles.container}>
      <Header name="Gerenciar Alunos" />
      <Text style={styles.text}>Rede Screen - Alunos</Text>
      <Button
        title="Criar Aluno"
        onPress={() => router.push(`/rede/new-user?role=student`)}
      />
      <View style={styles.border}>
        <UserList role={"student"} />
      </View>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary,
  },
  border: {
    borderWidth: 1,
    padding: 10,
  },
});
