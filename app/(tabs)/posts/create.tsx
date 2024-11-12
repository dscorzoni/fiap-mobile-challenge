import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { Colors } from '@/constants/Colors'
import Button from '@/components/Button'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { PostData } from '@/types'
import { useAuthContext } from '@/contexts/auth'
import { createPost } from '@/api/posts'

export default function CreatePost() {
  const [post, setPost] = useState<PostData>()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { user } = useAuthContext()

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
      post && user?.id ? (post.user_id = Number(user.id)) : null
      const response = await createPost(post as PostData)
      if (response) {
        Alert.alert('Post criado com sucesso!')
        router.replace(`/posts/list`)
      }
    } catch (error) {
      console.error('Erro ao criar post', error)
    }
  }

  return (
    <View style={styles.container}>
      <Header name={`Criar Post`} />
      <TextInput
        style={styles.input}
        placeholder='Título'
        value={post?.title || ''}
        onChangeText={(text) => handleInputChange('title', text)}
      />
      <TextInput
        style={styles.textarea}
        placeholder='Conteúdo'
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
        isDisabled={!post?.title || !post?.content}
        title='Salvar'
        onPress={handleSave}
      />
      <Button
        icon='arrow-back-circle'
        title='Voltar'
        onPress={() => router.back()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
