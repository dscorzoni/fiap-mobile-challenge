import { Text, StyleSheet } from "react-native"

interface Props {
  name: string
}

export default function Header({ name } : Props) {
  return (
      <Text style={styles.text}>{ name }</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 40,
    textAlign: "left",
    width: "100%",
    position: "absolute",
    top: 70,
    paddingHorizontal: 20
  }
})