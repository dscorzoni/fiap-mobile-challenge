import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";
import { useAuthContext } from "@/contexts/auth";
import SquareButton from "@/components/SquareButton";

export default function Profile() {
  const { handleLogout, isLoading, user } = useAuthContext();
  const isStudent = user?.role === "student";

  return (
    <View style={styles.container}>
      <Header name="Perfil" />
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Text style={styles.textLabel}>email</Text>
          <Text style={[styles.textInfo, { marginBottom: 20 }]}>
            {user?.email}
          </Text>
          <Text style={styles.textLabel}>username</Text>
          <Text style={styles.textInfo}>{user?.username}</Text>
        </View>
        <View>
          <View>
            {!isStudent && (
              <Button
                title="Meus posts"
                height={120}
                icon="book-outline"
                onPress={() =>
                  router.push(`/perfil/my-posts?email=${user?.email}`)
                }
              />
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                marginTop: 10,
              }}
            >
              <SquareButton
                title="Editar Perfil"
                icon="settings-outline"
                onPress={() =>
                  router.push(`/perfil/edit-profile?email=${user?.email}`)
                }
              />
              <SquareButton
                title="Sair"
                icon="log-out"
                onPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: "column",
  },
  contentContainer: {
    justifyContent: "center",
    flex: 1,
  },
  profileContainer: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 30,
    marginBottom: 10,
  },
  textLabel: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  textInfo: {
    fontSize: 16,
  },
});
