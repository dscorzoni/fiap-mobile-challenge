import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { useAuthContext } from "@/contexts/auth";

export default function PostDetail() {
  const { user } = useAuthContext();
  const { postId } = useLocalSearchParams<{ postId: string }>();

  return (
    <View style={styles.container}>
      <Header name={`Post ${postId}`} />
      <Text style={styles.text}>Detailed Post Screen</Text>
      {user?.role !== "student" && (
        <Button
          title="Edit Post"
          onPress={() => router.push(`/(tabs)/posts/edit?postId=${postId}`)}
        />
      )}
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
