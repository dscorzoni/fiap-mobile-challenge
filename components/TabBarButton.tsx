import React from "react";
import { TouchableOpacity, Text, AccessibilityState } from "react-native";
import { Href, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuthContext } from "@/contexts/auth";
import { Role } from "@/types";

interface CustomTabBarButtonProps {
  route: Href<string | object>;
  label: string;
  icon: "home" | "people" | "settings" | "person";
  accessibilityState?: AccessibilityState;
  restricted?: Role[];
}

const CustomTabBarButton = ({
  route,
  label,
  icon,
  restricted,
  accessibilityState = { selected: false },
}: CustomTabBarButtonProps) => {
  const router = useRouter();

  const { user } = useAuthContext();

  const handlePress = () => {
    router.replace(route);
  };

  const isVisible = !restricted || restricted.includes(user?.role as Role);

  return isVisible ? (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        marginTop: 8,
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Ionicons
        name={accessibilityState.selected ? `${icon}-sharp` : `${icon}-outline`}
        color={accessibilityState.selected ? Colors.primary : Colors.tab}
        size={24}
      />
      <Text
        style={{
          color: accessibilityState.selected ? Colors.primary : Colors.tab,
          fontSize: 10,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  ) : null;
};

export default CustomTabBarButton;
