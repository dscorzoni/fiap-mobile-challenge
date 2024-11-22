import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";
import { useAuthContext } from "@/contexts/auth";

export default function Profile() {
  const { handleLogout, isLoading, user } = useAuthContext();
  const isStudent = user?.role === "student";

  return (
    <View style={styles.container}>
      <Header name="Perfil" />
      <Text>email: {user?.email}</Text>
      <Text>username: {user?.username}</Text>
      <View style={styles.contentContainer}>
        <Button
          title="Editar Perfil"
          onPress={() =>
            router.push(`/perfil/edit-profile?email=${user?.email}`)
          }
        />
        {!isStudent && (
          <Button
            title="Meus Posts"
            onPress={() => router.push(`/perfil/my-posts?email=${user?.email}`)}
          />
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
    padding: 20,
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.primary,
  },
});
