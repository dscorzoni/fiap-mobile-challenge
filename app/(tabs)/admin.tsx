import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Header name="Admin" />
      <Text style={styles.text}>Admin Screen</Text>
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