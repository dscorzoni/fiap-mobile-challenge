import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="posts-list" options={{ headerShown: false }} />
      <Stack.Screen name="post-detail" options={{ headerShown: false }} />
      <Stack.Screen name="create-post" options={{ headerShown: false }} />
      <Stack.Screen name="edit-post" options={{ headerShown: false }} />
    </Stack>
  );
}
