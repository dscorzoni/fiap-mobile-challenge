import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='list' options={{ headerShown: false }} />
      <Stack.Screen name='detail' options={{ headerShown: false }} />
      <Stack.Screen name='create' options={{ headerShown: false }} />
      <Stack.Screen name='edit' options={{ headerShown: false }} />
    </Stack>
  );
}
