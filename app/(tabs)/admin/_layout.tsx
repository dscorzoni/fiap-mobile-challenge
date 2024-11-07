import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="edit-post" options={{ headerShown: false }} />
    </Stack>
  );
}
