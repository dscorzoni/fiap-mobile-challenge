import { Stack } from "expo-router";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle('light');
    });
  }, []);
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
