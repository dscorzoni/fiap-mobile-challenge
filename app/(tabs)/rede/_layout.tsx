import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="teacher-list" options={{ headerShown: false }} />
      <Stack.Screen name="student-list" options={{ headerShown: false }} />
      <Stack.Screen name="edit-user" options={{ headerShown: false }} />
      <Stack.Screen name="new-user" options={{ headerShown: false }} />
    </Stack>
  );
}
