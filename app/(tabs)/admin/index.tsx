import { StyleSheet, Text, View } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Button from "@/components/Button";

export default function Admin() {
  const posts = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <Header name="Admin" />
      <Text style={styles.text}>Admin Screen</Text>

      <Button
        title="Gerenciar Professores"
        onPress={() => router.push(`/(tabs)/rede/teacher-list`)}
      />
      <Button
        title="Gerenciar Alunos"
        onPress={() => router.push(`/(tabs)/rede/student-list`)}
      />

      {posts.map((post) => (
        <Button
          key={post}
          title={`Editar Post ${post}`}
          onPress={() => router.push(`/(tabs)/admin/edit-post?postId=${post}`)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary,
  },
});
