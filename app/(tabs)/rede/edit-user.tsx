import { StyleSheet, View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Role, User } from "@/types";
import UserForm from "@/components/UserForm";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth";
import { getUserById } from "@/api/user/userService";

export default function RedeEditUser() {
  const { email, role } = useLocalSearchParams<{
    email: string;
    role: Role;
  }>();

  const [user, setUser] = useState<User>();
  const auth = useAuthContext();

  const roleLabel = role === "teacher" ? "Professor" : "Estudante";

  const fetchUsers = async () => {
    const user = await getUserById(email);
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchUsers();
    }
  });

  return (
    <View style={styles.container}>
      <Header name={`Editar ${roleLabel}`} />
      <UserForm role={role} initialValues={user} />
      <View style={{ marginTop: 10, width: "100%" }}>
        <Button
          styleType="secondary"
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
