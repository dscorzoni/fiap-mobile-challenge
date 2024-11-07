import { Text, StyleSheet } from "react-native";
import { Role, User } from "@/types";

interface Props {
  role: Role;
  initialValues?: User;
}

export default function UserForm({ role, initialValues }: Props) {
  return (
    <>
      <Text style={styles.text}>TO DO: UserForm Component</Text>
      <Text style={styles.text}>
        ({initialValues ? "Edit" : "Create"}{" "}
        {role === "student" ? "student" : "teacher"})
      </Text>
      <Text>componente UserForm reaproveitado nas rotas:</Text>
      <Text>rede/edit-user e post/create-user</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 4,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
