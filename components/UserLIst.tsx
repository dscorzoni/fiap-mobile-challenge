import { Text, StyleSheet } from "react-native";
import { Role } from "@/types";
import Button from "./Button";
import { router } from "expo-router";

interface Props {
  role: Role;
}

export default function UserList({ role }: Props) {
  const users = [1, 2, 3];

  return (
    <>
      <Text style={styles.text}>TO DO: UserList Component</Text>
      {role && (
        <Text style={styles.text}>
          ({role === "student" ? "aluno" : "professor"})
        </Text>
      )}
      <Text>componente UserList reaproveitado nas rotas: </Text>
      <Text>rede/student-list e post/teacher-list</Text>
      {users.map((user) => (
        <Button
          key={user}
          title={`Editar ${role === "student" ? "aluno" : "professor"} ${user}`}
          onPress={() =>
            router.push(`/rede/edit-user?role=${role}&userId=${user}`)
          }
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 12,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
