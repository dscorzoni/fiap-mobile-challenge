import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { deletePost, getPostsByUser } from "@/api/posts";
import AdminItem from "@/components/AdminItem";
import { formatDate } from "@/api/utils/dates";
import FeedbackMessage from "@/components/FeedbackMessage";
import { useAuthContext } from "@/contexts/auth";

export default function RedeEditUser() {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { user } = useAuthContext();

  const { email, refresh } = useLocalSearchParams<{
    email: string;
    refresh: string;
  }>();

  useEffect(() => {
    if (refresh && !isLoading) {
      fetchPosts();
    }
  }, [refresh]);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getPostsByUser(email || (user?.email as string));
    if (response.success) {
      setPosts(response.value);
    } else {
      Alert.alert(
        "Não foi possível carregar os posts. Tente novamente mais tarde."
      );
    }
    setLoading(false);
  };

  const handleDeleteConfirmation = async (postId: string) => {
    const response = await deletePost(postId);

    if (response.success) {
      Alert.alert("Post apagado com sucesso!");
      fetchPosts();
    } else {
      Alert.alert("Não foi possível apagar o post. Tente novamente.");
    }
  };

  function handleDelete(postId: string) {
    Alert.alert(
      "Apagar post?",
      "Você tem certeza que deseja apagar este post?",
      [
        { text: "Apagar", onPress: () => handleDeleteConfirmation(postId) },
        { text: "Cancelar", onPress: () => null },
      ]
    );
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Header name={`Meus Posts`} />
      {!posts?.length || isLoading ? (
        <FeedbackMessage
          message={isLoading ? "Carregando posts..." : "Nenhum post encontrado"}
        />
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
                router.push(
                  `/home/post-detail?postId=${post.id}&refresh=${post.id}&tab=perfil/my-posts`
                )
              }
              editAction={() =>
                router.push(
                  `/(tabs)/home/edit-post?postId=${post.id}&tab=perfil/my-posts`
                )
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
