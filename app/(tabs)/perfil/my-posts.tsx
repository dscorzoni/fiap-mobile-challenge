import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Post, User } from "@/types";
import { useEffect, useState } from "react";
import { deletePost, getPostsByUser } from "@/api/posts";
import AdminItem from "@/components/AdminItem";
import { formatDate } from "@/api/utils/dates";

export default function RedeEditUser() {
  const [posts, setPosts] = useState<Post[]>();

  const { email } = useLocalSearchParams<{ email: string }>();

  const fetchPosts = async () => {
    const posts = await getPostsByUser(email);

    if (posts) {
      setPosts(posts);
    }
  };

  function handleDelete(postId: string) {
    Alert.alert(
      "Apagar post?",
      "Você tem certeza que deseja apagar este post?",
      [
        { text: "Apagar", onPress: () => deletePost(postId) },
        { text: "Cancelar", onPress: () => null },
      ]
    );
  }

  useFocusEffect(() => {
    fetchPosts();
  });

  return (
    <View style={styles.container}>
      <Header name={`Meus Posts`} />
      {!posts ? (
        <View style={styles.notFoundContainer}>
          <Text style={{ alignItems: "center", justifyContent: "center" }}>
            Nenhum post encontrado
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {posts.map((post) => (
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
              deleteAction={() => handleDelete(post.id as string)}
            />
          ))}
        </ScrollView>
      )}
      <View style={{ height: 20 }} />

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
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  text: {
    color: Colors.primary,
  },
  border: {
    borderWidth: 1,
    padding: 10,
  },
});
