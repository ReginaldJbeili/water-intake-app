// Component where the Water Intake lives
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WaterData({ waterIntake }) {
  return (
    <View style={styles.mainTextContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{`${(waterIntake / 1000).toFixed(
          1
        )} L`}</Text>
        <Text style={styles.subText}>Total Water</Text>
        <Text style={styles.subText}>Drunk</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}> 15</Text>
        <Text style={styles.subText}>Achieved</Text>
        <Text style={styles.subText}>Goal Days</Text>
      </View>
    </View>
  );
}

// Arranged alphabetically for clarity
const styles = StyleSheet.create({
  mainText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  mainTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "10%",
    marginLeft: "10%",
    paddingTop: "7%",
  },
  subText: {
    color: "#FFFFFF",
    fontSize: 15,
    textTransform: "uppercase",
  },
  textContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
