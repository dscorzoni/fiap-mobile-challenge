import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { useAuthContext } from "@/contexts/auth";

export default function PostsList() {
  const { user } = useAuthContext();
  const posts = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <Header name="Posts" />
      <Text style={styles.text}>Posts Screen</Text>

      {user?.role !== "student" && (
        <Button title="New Post" onPress={() => router.push(`/posts/new`)} />
      )}

      {posts.map((post) => (
        <Button
          key={post}
          title={`View Post ${post}`}
          onPress={() => router.push(`/(tabs)/posts/detail?postId=${post}`)}
        />
      ))}
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
