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
import { deleteUser, getUserList } from "@/api/user";
import ManageUserItem from "@/components/ManageUserItem";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";
import FeedbackMessage from "@/components/FeedbackMessage";

const { width } = Dimensions.get("window");
const paddings = 20 * 2;
const gap = 10;
const buttonWidth = (width - paddings - gap) / 2;

export default function Rede() {
  const [students, setStudents] = useState<User[]>();
  const [teachers, setTeachers] = useState<User[]>();
  const [isTeacher, setTeacher] = useState<boolean>(true);
  const [isLoading, setLoading] = useState(false);

  const { role, refresh } = useLocalSearchParams<{
    role: Role;
    refresh: Role;
  }>();

  const fetchUsers = async (role: Role) => {
    setLoading(true);
    const users = await getUserList(role);
    const setUsers = role === "teacher" ? setTeachers : setStudents;
    setUsers(users);
    setLoading(false);
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

  useEffect(() => {
    if (refresh && !isLoading) {
      fetchUsers(refresh);
    }
  }, [refresh]);

  const handleDeleteConfirmation = async (email: string) => {
    const response = await deleteUser(email);

    if (response.success) {
      Alert.alert(
        `${isTeacher ? "Professor" : "Estudante"} apagado com sucesso!`
      );
      fetchUsers(isTeacher ? "teacher" : "student");
    } else {
      Alert.alert(
        `Não foi possível apagar o(a) ${
          isTeacher ? "Professor(a)" : "Estudante"
        }`
      );
    }
  };

  function handleDelete(email: string) {
    if (email) {
      Alert.alert(
        `Apagar ${isTeacher ? "Professor(a)" : "Estudante"}?`,
        `Você tem certeza que deseja apagar este(a) ${
          isTeacher ? "Professor(a)" : "Estudante"
        }(a)?`,
        [
          { text: "Apagar", onPress: () => handleDeleteConfirmation(email) },
          { text: "Cancelar", onPress: () => null },
        ]
      );
    }
  }

  const handleChange = (isTeacherSelected: boolean) => {
    setLoading(true);
    setTeacher(isTeacherSelected);

    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header name="Rede" />
        <View style={styles.selectors}>
          <Button
            title={"Professores"}
            icon={"briefcase"}
            onPress={() => handleChange(true)}
            width={buttonWidth}
            height={60}
            styleType={isTeacher ? "primary" : "secondary"}
          />
          <Button
            title={"Estudantes"}
            icon={"people"}
            onPress={() => handleChange(false)}
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
        {isLoading ? (
          <FeedbackMessage message="Carregando Listagem..." />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <>
              {(isTeacher ? teachers : students)?.map((user) => {
                return (
                  <ManageUserItem
                    key={user.id}
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
        )}
      </View>
      <AddButton
        onPress={() =>
          router.push(
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
