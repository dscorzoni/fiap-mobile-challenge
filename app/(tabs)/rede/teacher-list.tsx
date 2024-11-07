import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";

export default function RedeTeacher() {
  const teachers = [1, 2, 3];

  return (
    <View style={styles.container}>
      <Header name="Gerenciar Professores" />
      <Text style={styles.text}>Rede Screen - Professores</Text>
      <Button
        title="Criar Professor"
        onPress={() => router.push(`/rede/new-user?role=teacher`)}
      />
      {teachers.map((teacher) => (
        <Button
          key={teacher}
          title={`Editar Professor ${teacher}`}
          onPress={() =>
            router.push(`/rede/edit-user?role=teacher&userId=${teacher}`)
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
