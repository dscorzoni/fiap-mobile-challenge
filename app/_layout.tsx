import { AuthContextProvider } from "@/contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        router.replace("/"); // Redireciona para a tela de login se o token não estiver presente
      } else {
        router.replace("/home");
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("light");
    });
  }, []);

  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </AuthContextProvider>
  );
}
