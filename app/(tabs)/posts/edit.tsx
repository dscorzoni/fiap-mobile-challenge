import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import EditPost from "@/components/EditPost";

export default function EditPostScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  return (
    <View style={[styles.border, styles.container]}>
      <EditPost postId={postId} />
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
  border: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 150,
  },
});
