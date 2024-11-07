import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Header from '@/components/Header'
import { Colors } from '@/constants/Colors'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { format } from 'date-fns'
import { getPosts } from '@/api/posts'
import Button from '@/components/Button'
export default function Index() {
  const [posts, setPosts] = useState<
    {
      id: number
      title: string
      date: string
      user: { username: string }
      content: string
      image: string
    }[]
  >([])
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('jwtToken')
      if (!token) {
        router.replace('/login') // Redireciona para a tela de login se o token não estiver presente
      }
    }
    checkLoginStatus()
    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
  }

  const fetchPosts = async () => {
    const posts = await getPosts()
    if (!posts) {
      router.replace('/login')
    } else {
      setPosts(posts)
    }
  }
  const [isTitleVisible, setIsTitleVisible] = useState(true)

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    setIsTitleVisible(offsetY < 50)
  }

  return (
    <View style={styles.container}>
      {isTitleVisible && (
          <Header name='Lista de Posts' />
      )}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.text}>{post.title}</Text>
            <Text style={styles.paragraph}>
              {formatDate(post.date)} - Por Professor(a) {post.user.username}
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
                styleType='primary'
                title='Continuar a leitura'
                onPress={() =>
                  router.navigate(`/posts/detail?postId=${post.id}`)
                }
              ></Button>
              <Button
                styleType='secondary'
                title='Editar postagem'
                onPress={() =>
                  router.navigate(`/posts/detail?postId=${post.id}`)
                }
              ></Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
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
