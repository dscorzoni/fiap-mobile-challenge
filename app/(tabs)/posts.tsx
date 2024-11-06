import { StyleSheet, Text, View, Image, Button } from 'react-native'
import Header from '@/components/Header'
import { Colors } from '@/constants/Colors'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { getPosts } from '../api/posts'
import { format } from 'date-fns'
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
    console.log(posts.image)
    if (!posts) {
      router.replace('/login')
    } else {
      setPosts(posts)
      
    }
  }

  return (
    <View style={styles.container}>
      <Header name='Lista de Posts' />
      {posts.map((post, index) => (
        <View key={index}>
          <Text style={styles.text}>{post.title}</Text>
          <Text style={styles.paragraph}>
            {formatDate(post.date) } - Por Professor(a) {post.user.username}
          </Text>
          {post.image && (
            <Image
              style={styles.image}
              source={{ uri:post.image }}
              onError={(e) =>
                console.log(`Erro ao carregar imagem: ${e.nativeEvent.error}`)
              }
            />
          )}
          <Text style={styles.content}>{post.content}</Text>
          <Button 
            title="Continuar a leitura"
            onPress={() => router.replace(`/posts`)}
          >
          </Button>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
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
    alignContent: 'center',
    width: 200,
    height: 200,
    marginVertical: 10,
    backgroundColor: Colors.lightGrey,
  },

})
