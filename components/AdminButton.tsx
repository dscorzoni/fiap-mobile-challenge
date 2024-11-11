import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

interface Props {
    title: string;
    onPress?(): void;
    icon?: keyof typeof Ionicons.glyphMap;
}

export default function AdminButton({title, onPress, icon}: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.adminButton}>
            <Ionicons style={styles.icon} name={icon} />
            <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    adminButton: {
        width: 150,
        height: 120,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 5,
        gap: 10,
        backgroundColor: Colors.primary
    },
    text: {
        fontSize: 15,
        textAlign: "center",
        color: Colors.white
    },
    icon: {
        fontSize: 40,
        color: Colors.white
    }
})