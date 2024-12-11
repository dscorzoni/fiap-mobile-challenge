import { ScrollView, StyleSheet, Text, View, Image, Alert } from "react-native";
import { Href, router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth";
import { getPostsById } from "@/api/posts";
import { PostData } from "@/types";
import { formatDate } from "@/api/utils/dates";
import { useHandleScroll } from "@/api/utils/handleScroll";
import FeedbackMessage from "@/components/FeedbackMessage";

export default function PostDetail() {
  const [post, setPost] = useState<PostData>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { user } = useAuthContext();
  const { postId, tab, refresh } = useLocalSearchParams<{
    postId: string;
    tab: string;
    refresh?: string;
  }>();
  const { handleScroll } = useHandleScroll();

  const previousTab = tab as Href<string>;

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (refresh && !isLoading) {
      fetchPostById(refresh);
    }
  }, [refresh]);

  const fetchPostById = async (id: string) => {
    setLoading(true);
    const response = await getPostsById(id);

    if (response.success) {
      setPost(response.value);
    } 
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        <Header name="Post" />

        {isLoading ? (
          <FeedbackMessage message="Carregando Post..." />
        ) : (
          post && (
            <View key={post.id} style={styles.postContainer}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.author}>
                {formatDate(String(post.date))} - Por Professor(a){" "}
                {post.user.username}
              </Text>
              {post.image && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: post.image }}
                    onError={(e) =>
                      console.log(
                        `Erro ao carregar imagem: ${e.nativeEvent.error}`
                      )
                    }
                  />
                </View>
              )}
              <Text style={styles.content}>{post.content}</Text>
              <View style={styles.actionBar}>
                {(user?.email === post.user.email ||
                  user?.role === "admin") && (
                  <Button
                    styleType="secondary"
                    title="Editar postagem"
                    icon="create"
                    onPress={() =>
                      router.push(`/home/edit-post?postId=${post.id}`)
                    }
                  ></Button>
                )}
                <Button
                  icon="arrow-back-circle"
                  styleType="primary"
                  title="Voltar"
                  onPress={() => {
                    previousTab ? router.push(previousTab) : router.back();
                  }}
                ></Button>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  postContainer: {},
  title: {
    paddingTop: 20,
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  content: {
    color: Colors.defaultText,
    fontSize: 16,
  },
  author: {
    color: Colors.defaultText,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  image: {
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: Colors.lightGrey,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  actionBar: {
    marginTop: 30,
    alignItems: "center",
    gap: 10,
  },
});
