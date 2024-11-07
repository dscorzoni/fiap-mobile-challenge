import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Role } from "@/types";

export default function RedeNewUser() {
  const { role } = useLocalSearchParams<{ role: Role }>();

  const roleLabel = role === "teacher" ? "Professor" : "Aluno";

  return (
    <View style={styles.container}>
      <Header name={`Criar novo ${roleLabel}`} />
      <Text style={styles.text}>New User Screen</Text>
      <Button title="Go back" onPress={() => router.back()}></Button>
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
