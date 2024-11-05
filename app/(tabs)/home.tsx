import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { useAuthContext } from "@/contexts/auth";

export default function Home() {
  const { onLogout } = useAuthContext();

  return (
    <View style={styles.container}>
      <Header name="Home" />
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Logout"
        icon="log-in"
        styleType="primary"
        onPress={onLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary,
  },
});
