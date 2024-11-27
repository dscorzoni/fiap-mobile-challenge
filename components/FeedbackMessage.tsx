import { StyleSheet, Text, View } from "react-native";

export default function FeedbackMessage({ message }: { message?: string }) {
  return (
    <View style={styles.container}>
      <Text
        style={{ alignItems: "center", justifyContent: "center", fontSize: 16 }}
      >
        {message || "Carregando..."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
