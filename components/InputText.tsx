import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder?: string,
  value?: string,
  onChange?: (text: string) => void,
  isPassword: boolean
}

export default function InputText({value, placeholder, onChange, isPassword} : Props) {
  return (
      <TextInput 
        secureTextEntry={isPassword}
        style={styles.inputText}
        value={value} 
        placeholder={placeholder} 
        onChangeText={onChange} 
      />
  )
}

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: "#fff",
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