import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";

export default function PostsList() {
  return (
    <View style={styles.container}>
      <Header name="Criar novo post" />
      <Text style={styles.text}>New Post Screen</Text>
      <Button title="Voltar" onPress={() => router.back()}></Button>
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
