import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder: string,
  value?: string,
  onChangeText?(): void,
  isPassword: boolean
}

export default function InputText({value, placeholder, onChangeText, isPassword} : Props) {
  return (
      <TextInput 
        secureTextEntry={isPassword}
        style={styles.inputText}
        value={value} 
        placeholder={placeholder} 
        onChangeText={onChangeText} 
      />
  )
}

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: "#ffffffe9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    width: "85%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 10
  }
})