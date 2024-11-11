import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
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
  };

  return (
    <View style={styles.container}>
      <Header name="Admin" />
      <Text style={styles.text}>Gerenciamento de Usuários</Text>
      <View style={styles.userAdmin}>
        <AdminButton
          title={"Gerenciar Professores"}
          icon={"briefcase"}
          onPress={() => router.push(`/(tabs)/rede/teacher-list`)}
        />
        <AdminButton
          title={"Gerenciar Alunos"}
          icon={"people"}
          onPress={() => router.push(`/(tabs)/rede/student-list`)}
        />
      </View>

      <Text style={styles.text}>Gerenciamento de Posts</Text>

      <View style={{
        maxHeight: "60%",
        paddingTop: 10,
      }}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{
            paddingLeft: 10,
          }}
        >
          <View style={styles.postsContainer}>
            {
            posts === undefined ?
              <Text>Não há postagens a serem mostradas.</Text> :
              posts.map((post) => (
                <AdminItem
                  key={post.id}
                  postId={post.id}
                  authorName={post.user.username}
                  postTitle={post.title}
                  postDate={formatDate(String(post.date))}
                  showItem={() => router.navigate(`/posts/detail?postId=${post.id}`)}
                  editAction={() => router.push(`/(tabs)/posts/edit?postId=${post.id}`)}
                  deleteAction={() => handleDelete(post.id)}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary,
    fontSize: 20
  },
  postsContainer: {
    marginTop: 10
  },
  userAdmin: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingVertical: 20
  }
});
