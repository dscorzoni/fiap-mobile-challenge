import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";
import { useAuthContext } from "@/contexts/auth";
import { useEffect } from "react";

export default function Rede() {
  const { user } = useAuthContext();
  const isStudent = user?.role === "student";

  useEffect(() => {
    if (isStudent) {
      router.replace(`/rede/student-list`);
      return;
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header name="Rede" />
      <Text style={styles.text}>Rede Screen</Text>
      {!isStudent && (
        <Button
          title="Gerenciar Professores"
          onPress={() => router.push(`/rede/teacher-list`)}
        />
      )}
      <Button
        title="Gerenciar Alunos"
        onPress={() => router.push(`/rede/student-list`)}
      />
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
