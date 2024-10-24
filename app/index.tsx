import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header name="Escola CMS" />
      <View>
        <Ionicons name="document-text-outline" size={150} style={styles.icon} />
      </View>
      <Button title="Login" icon="log-in" styleType="primary" onPress={ () => router.push("/login") } />
      <Button title="Registre-se" icon="person-add" styleType="secondary" onPress={ () => router.push("/register") } />
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
    color: Colors.black
  },
  icon: {
    color: Colors.primary,
    padding: 16,
    marginBottom: 36
  }
})