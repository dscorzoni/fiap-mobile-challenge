import { Text, Pressable, StyleSheet } from "react-native"

interface Props {
  title: string,
  styleType: "primary" | "secondary",
  onPress?(): void
}

export default function Button({title, styleType, onPress} : Props) {
  return (
    <Pressable onPress={onPress} style={styleType=== "secondary" ? styles.buttonSecondary : styles.buttonPrimary}>
      <Text style={styleType=== "secondary" ? styles.buttonTextSecondary : styles.buttonTextPrimary}>{ title }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonPrimary: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#00000097",
    width: "90%",
    marginVertical: 10
  },
  buttonSecondary: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#ffffff8f",
    width: "90%",
  },
  buttonTextPrimary: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold"
  },
  buttonTextSecondary: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#b56403"
  },
})