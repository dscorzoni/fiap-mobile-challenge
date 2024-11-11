import { Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

interface Props {
  name: string;
}

export default function Header({ name }: Props) {
  return <Text style={styles.text}>{name}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: Colors.primary,
    fontSize: 40,
    textAlign: "left",
    width: "100%",
    // position: "absolute",
    // top: 70,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
});
