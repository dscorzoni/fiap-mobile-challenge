import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Role } from "@/types";
import UserForm from "@/components/UserForm";

export default function RedeNewUser() {
  const { role } = useLocalSearchParams<{ role: Role }>();

  const roleLabel = role === "teacher" ? "Professor(a)" : "Estudante";

  return (
    <View style={styles.container}>
      <Header name={`Novo(a) ${roleLabel}`} />
      <UserForm role={role} />
      <View style={{ marginTop: 10, width: "100%" }}>
        <Button
          styleType="secondary"
          icon="arrow-back-circle"
          title="Voltar"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: Colors.primary,
  },
  border: {
    borderWidth: 1,
    padding: 10,
  },
});
