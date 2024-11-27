import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Role, User } from "@/types";
import UserForm from "@/components/UserForm";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth";

export default function RedeEditUser() {
  const { user, setUser } = useAuthContext();

  const handleEditProfile = (userData: User) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  return (
    <View style={styles.container}>
      <Header name={`Alterar meus dados`} />
      <UserForm
        role={user?.role as Role}
        initialValues={user as User}
        isMyProfile
        onSuccess={handleEditProfile}
      />
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
