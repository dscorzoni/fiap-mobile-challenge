import { StyleSheet, TextInput, Alert, View } from "react-native";
import { Role, User } from "@/types";
import React, { useState } from "react";
import Button from "./Button";
import { createUser, updateUser } from "@/api/user";
import { Href, router } from "expo-router";
import { Colors } from "@/constants/Colors";

interface Props {
  role: Role;
  initialValues?: User;
  isMyProfile?: boolean;
  onSuccess?: (userData: User) => void;
}

export default function UserForm({
  initialValues,
  isMyProfile,
  role,
  onSuccess,
}: Props) {
  const [userData, setUserData] = useState<User>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>();

  const isEdit = initialValues ? true : false;
  const infoUser = {
    label: role === "teacher" ? "Professor(a)" : "Estudante",
    route: isMyProfile ? "/perfil" : `/rede?role=${role}&refresh=${role}`,
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

  const handleSave = async () => {
    try {
      setLoading(true);
      if (!isEdit && userData && !isLoading) {
        const response = await createUser({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role: role,
        });
        if (response.success) {
          Alert.alert(`${infoUser.label} criado com sucesso!`);
          router.push(infoUser.route as Href);
          onSuccess && onSuccess(userData);
        } else {
          Alert.alert(
            `Ocorreu um problema ao tentar criar ${infoUser.label}`,
            response.error
          );
        }
      } else if (initialValues && userData && !isLoading) {
        const response = await updateUser(initialValues.email, userData);
        if (response.success) {
          const successMessage = isMyProfile
            ? "Perfil editado com sucesso!"
            : `${infoUser.label} editado com sucesso!`;
          Alert.alert(successMessage);
          router.push(infoUser.route as Href);
          onSuccess && onSuccess(userData);
        } else {
          Alert.alert(
            `Ocorreu um problema ao tentar editar o ${
              isMyProfile ? "perfil" : infoUser.label
            }`,
            response.error
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        placeholderTextColor={Colors.primary}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholder="Email"
        defaultValue={initialValues?.email}
        onChangeText={(text) => handleInputChange("email", text)}
        placeholderTextColor={Colors.primary}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder={initialValues ? "Nova Senha" : "Senha"}
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
        placeholderTextColor={Colors.primary}
      ></TextInput>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholderTextColor={Colors.primary}
      ></TextInput>
      <View style={{ marginTop: 20 }} />
      <Button
        title="Salvar"
        isDisabled={validateSaveBtn()}
        onPress={handleSave}
        icon="save"
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
    color: Colors.primary,
    backgroundColor: Colors.lightYellow,
    padding: 12,
    marginTop: 10,
    width: "100%",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
});
