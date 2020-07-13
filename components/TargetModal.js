// Component where the Target Water Intake modal lives
// Utilised a React native Modal Overlay to handle background change upon tapping modal
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image as IconImage,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Overlay from "react-native-modal-overlay";

export default function TargetModal({
  modalVisible,
  setModalVisible,
  modalInput,
  setModalInput,
  targetWaterIntake,
  setTargetWaterIntake,
}) {
  return (
    <View style={styles.modalContainer}>
      {/*Target Intake and Pencil Area*/}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.pencilContainer}>
          <Text style={styles.mainText}>
            {`${(targetWaterIntake / 1000).toFixed(1)} L`}
          </Text>
          <IconImage
            style={styles.pencil}
            source={require("../assets/pencil.png")}
          />
        </View>
      </TouchableOpacity>

      {/*Modal Opened Area*/}
      <Overlay
        visible={modalVisible}
        childrenWrapperStyle={styles.childrenWrapper}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.xContainer}>
            <Text style={styles.modalX} onPress={() => setModalVisible(false)}>
              x
            </Text>
          </View>
          <Text style={styles.modalMainText}>Update Target Water</Text>
          <Text style={styles.modalText}>Please enter your</Text>
          <Text style={styles.modalText}>new water target below:</Text>
          <View style={styles.containerWrapper}>
            {/*Changed keyboard to numeric to minimise handling of non-numbers*/}
            <TextInput
              keyboardType={"numeric"}
              style={styles.inputContainer}
              placeholder={"ml"}
              placeholderTextColor={"#42c7fe"}
              onChangeText={(modalInput) => setModalInput(modalInput)}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setTargetWaterIntake(modalInput);
            }}
          >
            <View style={styles.updateButton}>
              <Text style={styles.updateText}>Update</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Overlay>
    </View>
  );
}

// Arranged alphabetically for clarity
const styles = StyleSheet.create({
  childrenWrapper: {
    borderRadius: 15,
    marginLeft: "15%",
    marginRight: "15%",
  },
  containerWrapper: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#42c7fe",
    borderRadius: 5,
    fontSize: 20,
    height: 30,
    width: 140,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    paddingRight: "3%",
  },
  mainText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  modalContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: "8%",
    paddingBottom: "25%",
  },
  modalMainText: {
    color: "#42c7fe",
    marginBottom: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalX: {
    color: "#42c7fe",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: -10,
  },
  modalText: {
    color: "#42c7fe",
    textAlign: "center",
  },
  pencil: {
    height: 30,
    width: 30,
  },
  pencilContainer: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#42c7fe",
    width: 140,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: "6%",
    marginBottom: "7%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  updateText: {
    textTransform: "uppercase",
    color: "#FFFFFF",
    textAlign: "center",
  },
  xContainer: {
    alignItems: "flex-end",
  },
});
