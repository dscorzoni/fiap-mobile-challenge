import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { router } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { PostData } from "@/types";
import { useAuthContext } from "@/contexts/auth";
import { createPost } from "@/api/posts";
import { Ionicons } from "@expo/vector-icons";

export default function CreatePost() {
  const [post, setPost] = useState<PostData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useAuthContext();

  const handleInputChange = (name: string, value: string) => {
    setPost({ ...post, [name]: value } as PostData);
  };

  const handleImageUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImagePreview(base64Image);
        setPost({ ...post, image: base64Image } as PostData);
      }
    } catch (error) {
      console.error("Erro ao carregar imagem", error);
    }
  };

  const handleSave = async () => {
    try {
      post && user?.id ? (post.user_id = Number(user.id)) : null;
      const response = await createPost(post as PostData);
      if (response) {
        Alert.alert("Post criado com sucesso!");
        router.replace(`/home/posts-list`);
      }
    } catch (error) {
      console.error("Erro ao criar post", error);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setPost({ ...post, image: "" } as PostData);
  };

  return (
    <View style={styles.container}>
      <Header name={`Criar Post`} />
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={post?.title || ""}
        onChangeText={(text) => handleInputChange("title", text)}
        placeholderTextColor={Colors.primary}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Conteúdo"
        value={post?.content || ""}
        onChangeText={(text) => handleInputChange("content", text)}
        multiline
        numberOfLines={4}
        placeholderTextColor={Colors.primary}
      />
      <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
        <Ionicons name="cloud-upload" style={styles.icon} />
        <Text style={styles.uploadButtonText}>Anexar imagem</Text>
      </TouchableOpacity>
      {imagePreview && (
        <View>
          <TouchableOpacity
            onPress={handleRemoveImage}
            style={styles.removeImageButton}
          >
            <Ionicons name="close-circle-outline" style={{ fontSize: 28 }} />
          </TouchableOpacity>
          <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
        </View>
      )}
      <Button
        icon="save"
        isDisabled={!post?.title || !post?.content}
        title="Salvar"
        onPress={handleSave}
      />
      <Button
        icon="arrow-back-circle"
        styleType="secondary"
        title="Voltar"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    color: Colors.primary,
    backgroundColor: Colors.lightYellow,
    padding: 12,
    marginTop: 10,
    width: "100%",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  textarea: {
    color: Colors.primary,
    backgroundColor: Colors.lightYellow,
    padding: 12,
    marginTop: 10,
    width: "100%",
    height: 250,
    textAlign: "left",
    textAlignVertical: "top",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  uploadButton: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.uploadButton,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
  },
  uploadButtonText: {
    color: Colors.white,
    textAlign: "center",
  },
  removeImageButton: {
    position: "absolute",
    top: -15,
    right: -25,
    margin: 10,
    padding: 5,
    opacity: 0.8,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    color: Colors.darkGrey,
    backgroundColor: Colors.white,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  icon: {
    alignContent: "center",
    fontSize: 20,
    color: Colors.white,
  },
});
