import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RadioButton from "./RadioButton";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handlePress = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={option.value === selectedValue}
          onPress={handlePress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    marginLeft: 20,
    marginRight: "auto",
  },
});

export default RadioGroup;
