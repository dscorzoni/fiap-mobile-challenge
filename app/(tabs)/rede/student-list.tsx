import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";

export default function RedeStudent() {
  const students = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <Header name="Gerenciar Alunos" />
      <Text style={styles.text}>Rede Screen - Alunos</Text>
      <Button
        title="Criar Aluno"
        onPress={() => router.push(`/rede/new-user?role=student`)}
      />
      {students.map((student) => (
        <Button
          key={student}
          title={`Editar Aluno ${student}`}
          onPress={() =>
            router.push(`/rede/edit-user?role=student&userId=${student}`)
          }
        />
      ))}
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
});
