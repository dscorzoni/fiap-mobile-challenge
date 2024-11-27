import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Href, router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth";
import { PostData } from "@/types";
import { getPostsById, updatePost, deletePost } from "@/api/posts";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Colors";
import { useHandleScroll } from "@/api/utils/handleScroll";
import { Ionicons } from "@expo/vector-icons";
import FeedbackMessage from "@/components/FeedbackMessage";
import React from "react";

export default function PostEdit() {
  const [post, setPost] = useState<PostData>();
  const [initialPost, setInitialPost] = useState<PostData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { postId, tab } = useLocalSearchParams<{
    postId: string;
    tab: string;
  }>();

  const previousTab = tab as Href<string>;

  const { user } = useAuthContext();

  const { handleScroll } = useHandleScroll();

  useEffect(() => {
    if (user && postId) {
      fetchPostById();
    }
  }, [user, postId]);

  const fetchPostById = async () => {
    setLoading(true);
    const response = await getPostsById(postId);

    if (response.success) {
      setPost(response.value);
      setInitialPost(response.value);
      setImagePreview(response.value.image);
    } 
    setLoading(false);
  };

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
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImagePreview(uri);
        setPost({ ...post, image: uri } as PostData);
      }
    } catch (error) {
      console.error("Erro ao carregar imagem", error);
    }
  };

  const handleGoBack = (shouldRefresh = false) => {
    const refreshParam = shouldRefresh ? `?refresh=${postId}` : "";
    if (previousTab) {
      router.push(`${previousTab}${refreshParam}` as Href);
    } else {
      router.push(`home/posts-list${refreshParam}` as Href);
    }
  };

  const handleSave = async () => {
    if (post) {
      const response = await updatePost(postId, {
        content: post.content,
        title: post.title,
        image: post.image ? post.image : "",
      });

      if (response.success) {
        Alert.alert("Post atualizado com sucesso!");
        handleGoBack(true);
      } else {
        Alert.alert("Erro ao atualizar post.", response.error);
      }
    }
  };

  const handleDelete = async () => {
    if (post?.id) {
      Alert.alert(
        "Apagar post?",
        "Você tem certeza que deseja apagar este post?",
        [
          {
            text: "Apagar",
            onPress: async () => {
              try {
                const response = await deletePost(post?.id as string);
                if (response) {
                  Alert.alert("Post deletado com sucesso!");
                  handleGoBack(true);
                }
              } catch (error) {
                console.error("Erro ao deletar post", error);
              }
            },
          },
          { text: "Cancelar", onPress: () => null },
        ]
      );
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setPost({ ...post, image: "" } as PostData);
  };

  const hasChanges = JSON.stringify(post) !== JSON.stringify(initialPost);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Header name={`Editar Post`} />
        {isLoading ? (
          <FeedbackMessage message="Carregando post..." />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={post?.title || ""}
              onChangeText={(text) => handleInputChange("title", text)}
            />
            <TextInput
              style={styles.textarea}
              placeholder="Conteúdo"
              value={post?.content || ""}
              onChangeText={(text) => handleInputChange("content", text)}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              onPress={handleImageUpload}
              style={styles.uploadButton}
            >
              <Ionicons name="cloud-upload" style={styles.icon} />
              <Text style={styles.uploadButtonText}>
                {imagePreview ? "Alterar" : "Anexar"} imagem
              </Text>
            </TouchableOpacity>
            {imagePreview && (
              <View>
                <TouchableOpacity
                  onPress={handleRemoveImage}
                  style={styles.removeImageButton}
                >
                  <Ionicons
                    name="close-circle-outline"
                    style={{ fontSize: 28 }}
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: imagePreview }}
                  style={styles.imagePreview}
                />
              </View>
            )}
            <Button
              icon="save"
              isDisabled={!hasChanges}
              title="Salvar"
              onPress={handleSave}
            />
            <Button
              icon="arrow-back-circle"
              title="Voltar"
              styleType="secondary"
              onPress={handleGoBack}
            />
            <Button
              icon="trash"
              styleType="secondary"
              title="Deletar"
              onPress={handleDelete}
            />
          </>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    color: Colors.primary,
    backgroundColor: Colors.lightYellow,
    padding: 12,
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
