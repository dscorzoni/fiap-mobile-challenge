import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import GradientBackground from "@/components/GradientBackground";

export default function Index() {
  return (
    <View style={styles.container}>
      <GradientBackground />
      <Text style={styles.text}>Profile Screen</Text>
      <Link href="/">
          Go back to Home screen!
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff"
  }
})