import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";

export default function Post() {
  return (
    <View style={styles.container}>
      <Header name="Post" />
      <Text style={styles.text}>Detailed Post Screen</Text>
      <Button
        title="Go back"
        onPress={() => router.push("/posts/posts")}
      ></Button>
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
