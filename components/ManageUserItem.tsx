import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  id: string;
  username: string;
  email: string;
  editAction?(): void;
  deleteAction?(): void;
}

export default function ManageUserItem({
  id,
  username,
  email,
  editAction,
  deleteAction,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={editAction}>
          <Ionicons name="create" style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteAction}>
          <Ionicons name="trash" style={styles.warningIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.lightGrey,
    borderBottomColor: Colors.lightGrey,
  },
  contentContainer: {
    width: "80%",
    paddingRight: 10,
  },
  username: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  email: {
    fontSize: 15,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    fontSize: 10,
  },
  seeIcon: {
    fontSize: 30,
    color: Colors.primary,
  },
  editIcon: {
    fontSize: 30,
    color: Colors.darkGrey,
  },
  warningIcon: {
    fontSize: 30,
    color: Colors.warning,
  },
});
