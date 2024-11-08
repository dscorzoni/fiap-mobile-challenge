import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(value)}>
      <View style={[styles.radio, selected && styles.selectedRadio]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radio: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadio: {
    borderWidth: 5,
  },
  label: {
    marginLeft: 4,
    fontSize: 15,
  },
});

export default RadioButton;
