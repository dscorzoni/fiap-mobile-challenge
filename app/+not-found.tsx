import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { useAuthContext } from "@/contexts/auth";

export default function NotFoundScreen() {
  const { user } = useAuthContext();
  const href = user ? "/home" : "/";

  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View style={styles.container}>
        <Link href={href}>Go back to Home screen!</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
