import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { logout } from "../api/auth/authService";

export default function Home() {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        router.replace("/login"); // Redireciona para a tela de login se o token não estiver presente
      }
    };
    checkLoginStatus();
  }, []);
  return (
    <View style={styles.container}>
      <Header name="Home" />
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Logout" icon="log-in" styleType="primary" onPress={logout}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: Colors.primary
  }
})