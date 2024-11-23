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
import { router } from "expo-router";
import AdminButton from "@/components/AdminButton";
import AdminItem from "@/components/AdminItem";
import { useEffect, useState } from "react";
import { PostData } from "@/types/posts";
import { useAuthContext } from "@/contexts/auth";
import { deletePost, getPosts } from "@/api/posts";
import { formatDate } from "@/api/utils/dates";

export default function Admin() {
  const [posts, setPosts] = useState<PostData[]>();
  const user = useAuthContext();

  const fetchPosts = async () => {
    const posts = await getPosts();
    if (!posts) {
      router.replace("/login");
    } else {
      setPosts(posts);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, posts]);

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

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Header name="Admin" />
        <Text style={styles.text}>Gerenciamento de Usuários</Text>
        <View style={styles.userAdmin}>
          <AdminButton
            title={"Gerenciar Professores"}
            icon={"briefcase"}
            onPress={() => router.push(`/(tabs)/rede/teacher-list`)}
          />
          <AdminButton
            title={"Gerenciar Estudantes"}
            icon={"people"}
            onPress={() => router.push(`/(tabs)/rede/student-list`)}
          />
        </View>

        <Text style={styles.text}>Gerenciamento de Posts</Text>
      </View>

      <View style={styles.postsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {posts === undefined ? (
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
  },
  postsContainer: {
    marginVertical: 10,
    height: postsHeight,
  },
  userAdmin: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingVertical: 20,
  },
});
