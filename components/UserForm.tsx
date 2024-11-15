import { StyleSheet, TextInput, Alert, Text } from "react-native";
import { Role, User } from "@/types";
import React, { useState } from "react";
import Button from "./Button";
import { createUser, updateUser } from "@/api/user/userService";
import { Href, router, useLocalSearchParams } from "expo-router";

interface Props {
  role: Role;
  initialValues?: User;
}

export default function UserForm({ initialValues }: Props) {
  const { role } = useLocalSearchParams<{ role: Role }>();
  const [userData, setUserData] = useState<User>();
  const isEdit = initialValues ? true : false;
  const infoUser = {
    label: role === "teacher" ? "Professor(a)" : "Estudante",
    route: "/rede/" + (role === "teacher" ? "teacher-list" : "student-list"),
  };

  const handleInputChange = (name: string, value: string) => {
    setUserData({
      ...userData,
      [name]: value,
    } as User);
  };

  const validateSaveBtn = () => {
    if (!isEdit) {
      return (
        !userData?.email ||
        !userData?.password ||
        confirmPassword !== userData.password ||
        !userData?.username
      );
    } else {
      if (!userData) return true;
      if (userData && userData.username === initialValues?.username)
        return true;
      if (userData && userData.email === initialValues?.email) return true;
      if (userData && userData.password !== confirmPassword) return true;
      return false;
    }
  };

  const [confirmPassword, setConfirmPassword] = useState<string>();
  const handleSave = async () => {
    try {
      if (!isEdit && userData) {
        const response = await createUser({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role: role,
        });
        if (response.success) {
          Alert.alert(`${infoUser.label} criado com sucesso!`);
          router.replace(infoUser.route as Href);
        } else {
          Alert.alert(`Ocorreu um problema ao tentar criar ${infoUser.label}`);
        }
      } else if (initialValues && userData) {
        const response = await updateUser(initialValues.email, userData);
        if (response.success) {
          Alert.alert(`${infoUser.label} editado com sucesso!`);
          router.replace(infoUser.route as Href);
        } else {
          Alert.alert(`Ocorreu um problema ao tentar editar ${infoUser.label}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Nome"
        defaultValue={initialValues?.username}
        onChangeText={(text) => handleInputChange("username", text)}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholder="Email"
        defaultValue={initialValues?.email}
        onChangeText={(text) => handleInputChange("email", text)}
      ></TextInput>
      {!initialValues && (
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("password", text)}
        ></TextInput>
      )}
      {!initialValues && (
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        ></TextInput>
      )}
      {initialValues && (
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Nova Senha"
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("password", text)}
        ></TextInput>
      )}
      {initialValues && (
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        ></TextInput>
      )}

      <Button
        title="Salvar"
        isDisabled={validateSaveBtn()}
        onPress={handleSave}
      ></Button>
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
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});
