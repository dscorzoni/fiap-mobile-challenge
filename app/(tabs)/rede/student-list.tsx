import { Alert, ScrollView, StyleSheet, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";
import ManageUserItem from "@/components/ManageUserItem";
import { useAuthContext } from "@/contexts/auth";
import { useEffect, useState } from "react";
import { User } from "@/types/users";
import { deleteUser, getUserList } from "@/api/user/userService";

export default function RedeStudent() {
  const [students, setStudents] = useState<User[]>();
  const auth = useAuthContext();

  const fetchStudents = async () => {
    const students = await getUserList("student");
    if (!students) {
      router.replace("/login");
    } else {
      setStudents(students);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStudents();
    }
  });

  if (auth.user?.role === "student") {
    router.replace("/");
  }

  function handleDelete(email: string) {
    if (email) {
      Alert.alert(
        "Apagar estudante?",
        "Você tem certeza que deseja apagar este(a) estudante?",
        [
          { text: "Apagar", onPress: () => deleteUser(email) },
          { text: "Cancelar", onPress: () => null },
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Header name="Estudantes" />
      <Button
        title="Novo(a) Estudante"
        onPress={() => router.push(`/rede/new-user?role=student`)}
        icon="person-add"
      />
      <View
        style={{
          maxHeight: "70%",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{
            paddingLeft: 10,
          }}
        >
          {students?.map((student) => {
            return (
              <ManageUserItem
                key={student.id}
                id={student.id}
                username={student.username}
                email={student.email}
                editAction={() =>
                  router.push(
                    `/rede/edit-user?email=${student.email}&&role=student`
                  )
                }
                deleteAction={() => handleDelete(student.email)}
              />
            );
          })}
        </ScrollView>
      </View>
      <Button
        title="Voltar"
        styleType="secondary"
        onPress={() => router.replace("/home")}
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
    paddingHorizontal: 20,
    paddingVertical: 70,
    gap: 20,
  },
});
