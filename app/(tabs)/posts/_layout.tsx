import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="posts" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
    </Stack>
  );
}
