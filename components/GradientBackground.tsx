import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export default function GradientBackground() {
  return (
  <LinearGradient colors={[Colors.grandientLight, Colors.gradientDark]} style={styles.background} />
  )
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})