import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, StyleSheet } from "react-native";

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
  placeholder?: string;
}

export default function SearchField({
  searchText,
  setSearchText,
  placeholder,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Ionicons name="search" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={Colors.primary}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputArea: {
    width: "100%",
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: Colors.lightYellow,
    borderWidth: 1,
    borderColor: Colors.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    color: Colors.primary,
    paddingVertical: 12,
  },
  icon: {
    fontSize: 30,
    color: Colors.primary,
  },
});
