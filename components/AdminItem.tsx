import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface Props {
    postId?: string,
    authorName: string,
    postTitle: string,
    postDate: string,
    showItem?(): void,
    editAction?(): void,
    deleteAction?(): void
}

export default function AdminItem({postId, authorName, postTitle, postDate, showItem, editAction, deleteAction}: Props) {
    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.postTitle}>{postTitle}</Text>
                <Text style={styles.text}>{postDate} - Por: {authorName}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={showItem}><Ionicons name="eye" style={styles.seeIcon} /></TouchableOpacity>
                <TouchableOpacity onPress={editAction}><Ionicons name="create" style={styles.editIcon} /></TouchableOpacity>
                <TouchableOpacity onPress={deleteAction}><Ionicons name="trash" style={styles.warningIcon} /></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: "95%",
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
        width: "70%",
        paddingRight: 10
    },
    postTitle: {
        fontWeight: "bold",
        color: Colors.primary
    },
    text: {
        fontSize: 15
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
        fontSize: 10
    },
    seeIcon: {
        fontSize: 30,
        color: Colors.primary
    },
    editIcon: {
        fontSize: 30,
        color: Colors.darkGrey
    },
    warningIcon: {
        fontSize: 30,
        color: Colors.warning
    }
})