import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import SquareButton from "@/components/SquareButton";
import AdminItem from "@/components/AdminItem";
import { useEffect, useState } from "react";
import { PostData } from "@/types/posts";
import { deletePost, getPosts } from "@/api/posts";
import { formatDate } from "@/api/utils/dates";
import FeedbackMessage from "@/components/FeedbackMessage";

export default function Admin() {
  const [posts, setPosts] = useState<PostData[]>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { refresh } = useLocalSearchParams<{ refresh?: string }>();

  useEffect(() => {
    if (refresh && !isLoading) {
      fetchPosts();
    }
  }, [refresh]);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getPosts();

    if (response.success) {
      setPosts(response.value);
    } else {
      Alert.alert("Erro ao carregar os posts", response.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchPosts();
    }
  }, []);

  const handleDeleteConfirmation = async (postId: string) => {
    const response = await deletePost(postId);

    if (response.success) {
      Alert.alert("Post apagado com sucesso!");
    } else {
      Alert.alert("Não foi possível apagar o post. Tente novamente.");
    }
    fetchPosts();
  };

  function handleDelete(postId: string | undefined) {
    if (postId) {
      Alert.alert(
        "Apagar post?",
        "Você tem certeza que deseja apagar este post?",
        [
          { text: "Apagar", onPress: () => handleDeleteConfirmation(postId) },
          { text: "Cancelar", onPress: () => null },
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Header name="Admin" />
        <Text style={styles.text}>Gerenciamento de Usuários</Text>
        <View style={styles.userAdmin}>
          <SquareButton
            title={"Gerenciar Professores"}
            icon={"briefcase"}
            onPress={() => router.push(`/(tabs)/rede?role=teacher`)}
          />
          <SquareButton
            title={"Gerenciar Estudantes"}
            icon={"people"}
            onPress={() => router.push(`/(tabs)/rede?role=student`)}
          />
        </View>
      </View>

      <View style={styles.postsContainer}>
        <Text style={[styles.text, { marginBottom: 10 }]}>
          Gerenciamento de Posts
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {posts === undefined ? (
            <FeedbackMessage
              message={
                isLoading
                  ? "Carregando posts..."
                  : "Não há postagens a serem mostradas."
              }
            />
          ) : (
            posts.map((post) => (
              <AdminItem
                key={post.id}
                postId={post.id}
                authorName={post.user.username}
                postTitle={post.title}
                postDate={formatDate(String(post.date))}
                showItem={() =>
                  router.push(`/home/post-detail?postId=${post.id}&tab=admin`)
                }
                editAction={() =>
                  router.push(
                    `/(tabs)/home/edit-post?postId=${post.id}&tab=admin`
                  )
                }
                deleteAction={() => handleDelete(post.id)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const { height } = Dimensions.get("window");
const tabHeight = 110;
const coreHeight = 320;
const postsHeight = height - tabHeight - coreHeight - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  postsContainer: {
    marginVertical: 10,
    height: postsHeight,
    alignItems: "center",
  },
  userAdmin: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingVertical: 20,
  },
});
