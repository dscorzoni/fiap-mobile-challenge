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
    />
  );
}

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 12,
    marginTop: 10,
    width: "90%",
    textAlign: "center",
    fontSize: 16,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,
  },
});
