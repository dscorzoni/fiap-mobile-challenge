import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function GradientBackground() {
  return (
  <LinearGradient colors={['#febe71', '#a95d00']} style={styles.background} />
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