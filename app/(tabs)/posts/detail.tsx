import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth";
import { getPostsById } from "@/api/posts";
import { format } from "date-fns";
import { PostData } from "@/types";
import { formatDate } from "@/api/utils/dates";
import { useHandleScroll } from "@/api/utils/handleScroll";

export default function PostDetail() {
  const { user } = useAuthContext();
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [post, setPosts] = useState<PostData>()
  const { isTitleVisible, handleScroll } = useHandleScroll()
  useEffect(() => {
    if (user) {
      fetchPostById()
    }
  }, [user])

  const fetchPostById = async () => {
    const post = await getPostsById(postId)
    if (!post) {
      router.replace('/login')
    } else {
      setPosts(post)
    }
  }

  return (
    <View style={styles.container}>
    {isTitleVisible && <Header name='Post' />}
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ flex: 1 }}
    >
      {post && (
        <View key={post.id} style={styles.postContainer}>
          <Text style={styles.text}>{post.title}</Text>
          <Text style={styles.paragraph}>
            {formatDate(String(post.date))} - Por Professor(a) {post.user.username}
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
            <Button
              icon='arrow-back-circle'
              styleType='primary'
              title='Voltar'
              onPress={() => router.back()}
            ></Button>
          </View>
        </View>
     )}
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 100,
    padding: 10,
  },
  contentContainer: {
    padding: 10,
  },
  postContainer: {
    marginBottom: 20,
  },
  text: {
    paddingTop: 40,
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
  content: {
    color: Colors.defaultText,
    fontSize: 16,
  },
  paragraph: {
    color: Colors.defaultText,
    fontSize: 14,
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  actionBar: {
    paddingTop: 10,
    alignItems: 'center',
  },
})
