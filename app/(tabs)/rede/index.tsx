import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Role, User } from "@/types";
import { deleteUser, getUserList } from "@/api/user/userService";
import ManageUserItem from "@/components/ManageUserItem";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";

const { width } = Dimensions.get("window");
const paddings = 20 * 2;
const gap = 10;
const buttonWidth = (width - paddings - gap) / 2;

export default function Rede() {
  const [students, setStudents] = useState<User[]>();
  const [teachers, setTeachers] = useState<User[]>();
  const [isTeacher, setTeacher] = useState<boolean>(true);

  const { role } = useLocalSearchParams<{ role: Role }>();

  const fetchUsers = async (role: Role) => {
    const users = await getUserList(role);
    const setUsers = role === "teacher" ? setTeachers : setStudents;
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers("teacher");
    fetchUsers("student");
  }, []);

  useEffect(() => {
    if (role === "teacher") {
      setTeacher(true);
    } else if (role === "student") {
      setTeacher(false);
    }
  }, [role]);

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
      <View style={styles.headerContainer}>
        <Header name="Rede" />
        <View style={styles.selectors}>
          <Button
            title={"Professores"}
            icon={"briefcase"}
            onPress={() => setTeacher(true)}
            width={buttonWidth}
            height={60}
            styleType={isTeacher ? "primary" : "secondary"}
          />
          <Button
            title={"Estudantes"}
            icon={"people"}
            onPress={() => setTeacher(false)}
            width={buttonWidth}
            height={60}
            styleType={!isTeacher ? "primary" : "secondary"}
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={[styles.title, { marginBottom: 10 }]}>
          Listagem de {isTeacher ? "Professores" : "Estudantes"}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            {(isTeacher ? teachers : students)?.map((user) => {
              return (
                <ManageUserItem
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  email={user.email}
                  editAction={() =>
                    router.push(
                      `/rede/edit-user?email=${user.email}&role=${
                        isTeacher ? "teacher" : "student"
                      }`
                    )
                  }
                  deleteAction={() => handleDelete(user.email)}
                />
              );
            })}
            <View style={{ height: 80 }} />
          </>
        </ScrollView>
      </View>
      <AddButton
        onPress={() =>
          router.navigate(
            `/rede/new-user?role=${isTeacher ? "teacher" : "student"}`
          )
        }
      />
    </View>
  );
}

const { height } = Dimensions.get("window");
const tabHeight = 110;
const coreHeight = 200;
const usersHeight = height - tabHeight - coreHeight - 20;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    marginVertical: 10,
    height: usersHeight,
  },
  selectors: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
});
