import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { getPosts } from "@/api/posts";
import Button from "@/components/Button";
import { PostData } from "@/types/posts";
import { useAuthContext } from "@/contexts/auth";
import { formatDate } from "@/api/utils/dates";
import { useHandleScroll } from "@/api/utils/handleScroll";
import SearchField from "@/components/SearchField/SearchField";
import AddButton from "@/components/AddButton";
import FeedbackMessage from "@/components/FeedbackMessage";

export default function Index() {
  const [posts, setPosts] = useState<PostData[]>();
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  const { user } = useAuthContext();
  const { handleScroll } = useHandleScroll();

  const { refresh } = useLocalSearchParams<{ refresh?: string }>();

  useEffect(() => {
    if (!isLoading) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    if (refresh && !isLoading) {
      fetchPosts();
    }
  }, [refresh]);

  useEffect(() => {
    if (posts) {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, posts]);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getPosts();
    if (response.success) {
      setPosts(response.value);
    } else {
      Alert.alert("Não foi possível carregar os posts.", response.error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header name="Posts" />
        <SearchField
          searchText={searchText}
          setSearchText={setSearchText}
          placeholder="Busque pelo título do post"
        />
      </View>

      {!filteredPosts.length || isLoading ? (
        <FeedbackMessage
          message={isLoading ? "Carregando posts..." : "Nenhum post encontrado"}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {filteredPosts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
                {post.title}
              </Text>
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
              <Text
                style={styles.content}
                numberOfLines={5}
                ellipsizeMode="tail"
              >
                {post.content}
              </Text>
              <View style={styles.actionBar}>
                <Button
                  styleType="primary"
                  title="Continuar a leitura"
                  icon="reader"
                  onPress={() =>
                    router.push(`/home/post-detail?postId=${post.id}`)
                  }
                ></Button>
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
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {(user?.role === "admin" || user?.role === "teacher") && (
        <AddButton onPress={() => router.navigate("/home/create-post")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  scrollContainer: {},
  postContainer: {
    marginBottom: 40,
  },
  title: {
    paddingTop: 20,
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5,
  },
  content: {
    color: Colors.defaultText,
    fontSize: 16,
  },
  author: {
    color: Colors.defaultText,
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "bold",
  },
  image: {
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 200,
    height: 200,
    marginVertical: 10,
    backgroundColor: Colors.lightGrey,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  actionBar: {
    paddingTop: 10,
    alignItems: "center",
    gap: 10,
  },
  newPost: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
