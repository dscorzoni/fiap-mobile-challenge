import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { useAuthContext } from "@/contexts/auth";
import { router } from "expo-router";

export default function Home() {
  const { handleLogout, isLoading, user } = useAuthContext();

  return (
    <View style={styles.container}>
      <Header name="Home" />
      <View style={styles.contentContainer}>
        <Button title="Posts" onPress={() => router.push(`/(tabs)/posts`)} />
        {user?.role !== "student" && (
          <Button
            title="Professores"
            onPress={() => router.push(`/(tabs)/rede/teacher-list`)}
          />
        )}
        {user?.role !== "student" && (
          <Button
            title="Alunos"
            onPress={() => router.push(`/(tabs)/rede/student-list`)}
          />
        )}
        {user?.role === "admin" && (
          <Button title="Admin" onPress={() => router.push(`/(tabs)/admin`)} />
        )}
        <Button
          title={isLoading ? "Saindo..." : "Sair"}
          icon="log-in"
          onPress={handleLogout}
          isDisabled={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary,
  },
});
