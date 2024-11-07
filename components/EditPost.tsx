import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import PostForm from "@/components/PostForm";
import { Post } from "@/types";

interface Props {
  postId: string;
}

export default function EditPost({ postId }: Props) {
  return (
    <View style={styles.container}>
      <Header name={`Editar Post ${postId}`} />
      <Text style={{ fontWeight: "bold" }}>TO DO: EditPost Component</Text>
      <Text>componente EditPost reaproveitado nas rotas:</Text>
      <Text style={{ marginBottom: 30 }}>posts/edit e admin/edit-post</Text>
      <View style={styles.border}>
        <PostForm initialValues={{} as Post} />
      </View>
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
  border: {
    borderWidth: 1,
    padding: 5,
  },
});
