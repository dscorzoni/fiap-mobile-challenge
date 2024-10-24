import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import GradientBackground from "@/components/GradientBackground";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Header name="Posts" />
      <Text style={styles.text}>Posts Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: Colors.primary
  }
})