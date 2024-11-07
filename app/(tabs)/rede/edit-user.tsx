import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Role } from "@/types";

export default function RedeEditUser() {
  const { role, userId } = useLocalSearchParams<{
    role: Role;
    userId: string;
  }>();

  const roleLabel = role === "teacher" ? "Professor" : "Aluno";

  return (
    <View style={styles.container}>
      <Header name={`Editar ${roleLabel}: ${userId}`} />
      <Text style={styles.text}>Edit User Screen</Text>
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
