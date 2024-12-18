import { Colors } from "@/constants/Colors";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  isPassword?: boolean;
}

export default function InputText({
  value,
  placeholder,
  onChange,
  isPassword = false,
}: Props) {
  return (
    <TextInput
      secureTextEntry={isPassword}
      style={styles.inputText}
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
      autoCapitalize="none"
      placeholderTextColor={Colors.primary}
    />
  );
}

const styles = StyleSheet.create({
  inputText: {
    color: Colors.primary,
    backgroundColor: Colors.lightYellow,
    paddingVertical: 12,
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: Colors.primary,
  },
});
