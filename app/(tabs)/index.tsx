import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "@/components/Header";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import GradientBackground from "@/components/GradientBackground";
import { useState } from "react";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Home() {

  return (
    <View style={styles.container}>
      <Header name="Home" />
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: Colors.primary
  }
})