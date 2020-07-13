// Component where the + and - buttons live
// Debated using TouchableWithoutFeedback vs TouchableOpacity - Chose to stick to design
import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

export default function IntakeButtons({
  waterIntake,
  setWaterIntake,
  waterData,
}) {
  // Debated adding limit based on Target Intake Amount
  // Left without one so that user can increase Target Intake Amount to go above Water Intake
  const addIntake = function (amount) {
    setWaterIntake(waterIntake + amount);
  };

  // Added a catcher for users attempting to go below 0 in minusing - Can't drink a negative amount
  const subtractIntake = function (amount) {
    waterIntake - amount > 0
      ? setWaterIntake(waterIntake - amount)
      : setWaterIntake(0);
  };
  return (
    <View style={styles.buttonContainer}>
      <TouchableWithoutFeedback onPress={() => subtractIntake(waterData)}>
        <Image
          style={styles.button}
          source={require("../assets/minus-icon.png")}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => addIntake(waterData)}>
        <Image
          style={styles.button}
          source={require("../assets/plus-icon.png")}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: 70,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: "16%",
    paddingRight: "16%",
    marginTop: "4%",
    marginBottom: "20%",
  },
});
