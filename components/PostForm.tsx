import { Text, StyleSheet } from "react-native";
import { Post } from "@/types";

interface Props {
  initialValues?: Post;
}

export default function PostForm({ initialValues }: Props) {
  return (
    <>
      <Text style={styles.text}>TO DO: PostForm Component</Text>
      <Text style={styles.text}>({initialValues ? "Edit" : "Create"})</Text>
      <Text>componente PostForm reaproveitado nas rotas:</Text>
      <Text>admin/edit-post, post/edit e post/create </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 4,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
