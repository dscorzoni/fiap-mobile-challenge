import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Props {
  title: string;
  styleType?: "primary" | "secondary";
  onPress?(): void;
  icon?: keyof typeof Ionicons.glyphMap;
  isDisabled?: boolean;
}

export default function Button({
  title,
  styleType = "primary",
  onPress,
  icon,
  isDisabled = false,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={getStyle("button", styleType, isDisabled)}
    >
      {icon ? (
        <Ionicons name={icon} style={getStyle("text", styleType, isDisabled)} />
      ) : (
        ""
      )}
      <Text style={getStyle("text", styleType, isDisabled)}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyle = (
  component: "button" | "text",
  styleType: "primary" | "secondary",
  isDisabled: boolean
) => {
  const disabled = isDisabled ? "Disabled" : "";
  const styleName = `${component}${
    styleType.charAt(0).toUpperCase() + styleType.slice(1)
  }${disabled}`;
  return styles[styleName];
};

interface Styles {
  [key: string]: ViewStyle | TextStyle;
}

const baseButton: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 16,
  paddingHorizontal: 32,
  width: "90%",
  borderRadius: 5,
};

const baseText: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
};

const styles = StyleSheet.create<Styles>({
  buttonPrimary: {
    ...baseButton,
    backgroundColor: Colors.primary,
    marginVertical: 5,
  },
  buttonPrimaryDisabled: {
    ...baseButton,
    backgroundColor: Colors.darkGrey,
    marginVertical: 5,
  },
  buttonSecondary: {
    ...baseButton,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  buttonSecondaryDisabled: {
    ...baseButton,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
  },
  textPrimary: {
    ...baseText,
    color: "#fff",
  },
  textPrimaryDisabled: {
    ...baseText,
    color: "#fff",
  },
  textSecondary: {
    ...baseText,
    color: Colors.primary,
  },
  textSecondaryDisabled: {
    ...baseText,
    color: Colors.darkGrey,
  },
});
