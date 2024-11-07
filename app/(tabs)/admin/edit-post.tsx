import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";

export default function PostDetail() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  return (
    <View style={styles.container}>
      <Header name={`Editar Post ${postId}`} />
      <Text style={styles.text}>Edit Post Screen</Text>
      <Button title="Go back" onPress={() => router.back()}></Button>
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
