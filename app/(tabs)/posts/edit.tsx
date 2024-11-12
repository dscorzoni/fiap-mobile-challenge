import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Header from '@/components/Header'
import Button from '@/components/Button'
import { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '@/contexts/auth'
import { PostData } from '@/types'
import { getPostsById, updatePost, deletePost } from '@/api/posts'
import * as ImagePicker from 'expo-image-picker'
import { Colors } from '@/constants/Colors'

export default function PostEdit() {
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const [post, setPost] = useState<PostData>()
  const [initialPost, setInitialPost] = useState<PostData>()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { user } = useAuthContext()

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
      setPost(post)
      setInitialPost(post)
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setPost({ ...post, [name]: value } as PostData)
  }

  const handleImageUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri
        setImagePreview(uri)
        setPost({ ...post, image: uri } as PostData)
      }
    } catch (error) {
      console.error('Erro ao carregar imagem', error)
    }
  }

  const handleSave = async () => {
    try {
      const response = await updatePost(post)
      if (response) {
        Alert.alert('Post atualizado com sucesso!')
        router.replace(`/posts/list`)
      }
    } catch (error) {
      console.error('Erro ao atualizar post', error)
    }
  }

  const handleDelete = async () => {
    if (post?.id) {
      Alert.alert(
        'Apagar post?',
        'Você tem certeza que deseja apagar este post?',
        [
          {
            text: 'Apagar',
            onPress: async () => {
              try {
                const response = await deletePost(post?.id as string)
                if (response) {
                  Alert.alert('Post deletado com sucesso!')
                  router.replace(`/posts/list`)
                }
              } catch (error) {
                console.error('Erro ao deletar post', error)
              }
            },
          },
          { text: 'Cancelar', onPress: () => null },
        ]
      )
    }
  }

  const hasChanges = JSON.stringify(post) !== JSON.stringify(initialPost)

  return (
    <View style={styles.container}>
      <Header name={`Editar Post`} />
      <TextInput
        style={styles.input}
        placeholder='Title'
        value={post?.title || ''}
        onChangeText={(text) => handleInputChange('title', text)}
      />
      <TextInput
        style={styles.textarea}
        placeholder='Content'
        value={post?.content || ''}
        onChangeText={(text) => handleInputChange('content', text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Anexar imagem</Text>
      </TouchableOpacity>
      {imagePreview && (
        <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
      )}
      <Button
        icon='save'
        isDisabled={!hasChanges}
        title='Salvar'
        onPress={handleSave}
      />
      <Button
        icon='arrow-back-circle'
        title='Voltar'
        onPress={() => router.back()}
      />
      <Button icon='trash' title='Deletar' onPress={handleDelete} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  textarea: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    height: 250,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: Colors.uploadButton,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  uploadButtonText: {
    color: Colors.white,
    textAlign: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  icon: {
    alignContent: 'center',
    fontSize: 20,
    color: Colors.white,
  },
})
