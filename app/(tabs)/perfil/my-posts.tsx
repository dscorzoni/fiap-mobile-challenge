import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Post, User } from "@/types";
import { useEffect, useState } from "react";
import { deletePost, getPostsByUser } from "@/api/posts";
import AdminItem from "@/components/AdminItem";
import { formatDate } from "@/api/utils/dates";

export default function RedeEditUser() {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();
  const [posts, setPosts] = useState<Post[]>();

  const fetchPosts = async () => {
    const posts = await getPostsByUser(email);
    if (posts) {
      setPosts(posts);
    }
  };

  function handleDelete(postId: string | undefined) {
    if (postId) {
      Alert.alert(
        "Apagar post?",
        "Você tem certeza que deseja apagar este post?",
        [
          { text: "Apagar", onPress: () => deletePost(postId) },
          { text: "Cancelar", onPress: () => null },
        ]
      );
    }
  }

  useEffect(() => {
    if (email) {
      fetchPosts();
    }
  }, [email]);

  return (
    <View style={styles.container}>
      <Header name={`Meus Posts`} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!posts ? (
          <Text>Não há postagens a serem mostradas.</Text>
        ) : (
          posts.map((post) => (
            <AdminItem
              key={post.id}
              postId={post.id}
              authorName={post.user.username}
              postTitle={post.title}
              postDate={formatDate(String(post.date))}
              showItem={() =>
                router.navigate(`/home/post-detail?postId=${post.id}`)
              }
              editAction={() =>
                router.push(`/(tabs)/home/edit-post?postId=${post.id}`)
              }
              deleteAction={() => handleDelete(post.id)}
            />
          ))
        )}
      </ScrollView>

      <Button
        styleType="secondary"
        title="Voltar"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: Colors.primary,
  },
  border: {
    borderWidth: 1,
    padding: 10,
  },
});
