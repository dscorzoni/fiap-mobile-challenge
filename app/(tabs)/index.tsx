import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import Header from "@/components/Header";

export default function Index() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#febe71', '#a95d00']} style={styles.background} />
      <Header name="Escola CMS" />
      <Link href="/posts">Go to Posts Screen</Link>
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
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})