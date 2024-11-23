import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

interface Props {
  onPress?(): void;
}

export default function AddButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="add" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 999999,
    width: 60,
    height: 60,
    backgroundColor: Colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  icon: {
    fontSize: 40,
    color: Colors.white,
  },
});
