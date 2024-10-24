import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function Home() {

  return (
    <View style={styles.container}>
      <Header name="Home" />
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Back to Login" icon="log-in" styleType="primary" onPress={ () => router.replace("/") } />
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