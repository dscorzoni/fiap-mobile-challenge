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

export default function RedeTeacher() {
  const [teachers, setTeachers] = useState<User[]>();
  const auth = useAuthContext();

  const fetchTeachers = async () => {
    const teachers = await getUserList("teacher");
    if (!teachers) {
      router.replace("/login");
    } else {
      setTeachers(teachers);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchTeachers();
    }
  });

  if (auth.user?.role === "student") {
    router.replace("/");
  }

  function handleDelete(email: string) {
    if (email) {
      Alert.alert(
        "Apagar professor(a)?",
        "Você tem certeza que deseja apagar este(a) professor(a)?",
        [
          { text: "Apagar", onPress: () => deleteUser(email) },
          { text: "Cancelar", onPress: () => null },
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Header name="Professores" />
      <Button
        title="Novo(a) Professor(a)"
        onPress={() => router.push(`/rede/new-user?role=teacher`)}
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
          {teachers?.map((teacher) => {
            return (
              <ManageUserItem
                key={teacher.id}
                id={teacher.id}
                username={teacher.username}
                email={teacher.email}
                editAction={() =>
                  router.push(
                    `/rede/edit-user?email=${teacher.email}&&role=teacher`
                  )
                }
                deleteAction={() => handleDelete(teacher.email)}
              />
            );
          })}
        </ScrollView>
      </View>
      <Button
        title="Voltar"
        styleType="secondary"
        onPress={() => router.replace("/home/posts-list")}
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
