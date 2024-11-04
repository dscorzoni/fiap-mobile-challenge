import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  title: string;
  styleType?: "primary" | "secondary";
  onPress?(): void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function Button({
  title,
  styleType = "primary",
  onPress,
  icon,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        styleType === "secondary"
          ? styles.buttonSecondary
          : styles.buttonPrimary
      }
    >
      {icon ? (
        <Ionicons
          name={icon}
          style={
            styleType === "secondary"
              ? styles.buttonTextSecondary
              : styles.buttonTextPrimary
          }
        />
      ) : (
        ""
      )}
      <Text
        style={
          styleType === "secondary"
            ? styles.buttonTextSecondary
            : styles.buttonTextPrimary
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonPrimary: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: Colors.primary,
    width: "90%",
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonSecondary: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "90%",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  buttonTextPrimary: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
