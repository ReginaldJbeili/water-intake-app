// Area where all components get imported.
// Thought of using separate screen for file architecture, chose to keep in App.
// Used Expo with React Native library for main functionality
// Used React Native Snap Carousel Library for water intake scroll utilisation.

import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  AsyncStorage,
  Platform,
  StatusBar as Status,
} from "react-native";
import Human from "./components/Human";
import TargetModal from "./components/TargetModal";
import IntakeButtons from "./components/IntakeButtons";
import WaterIntake from "./components/WaterIntake";
import Carousel from "react-native-snap-carousel";

// Data utilised by Water Intake Carousel
const waterData = [150, 250, 350];

// Creates item to render in Carousel
_renderItem = ({ item, index }) => {
  return (
    <View style={styles.waterIntakeScroll}>
      <Text style={styles.waterIntakeText}>{item} ml</Text>
    </View>
  );
};

export default function App() {
  // React hooks used throughout app

  // Water intake on top left of app
  const [waterIntake, setWaterIntake] = React.useState(0);

  // Data index that changes with scrolling of Carousel
  const [selected, setSelected] = React.useState(0);

  // Modal open or closed
  const [modalVisible, setModalVisible] = React.useState(false);

  // Target water intake beside pencil.
  // Initial value on first load of app ever. Uses AsyncStorage for future loads
  const [targetWaterIntake, setTargetWaterIntake] = React.useState(3500);

  // Text input of modal
  const [modalInput, setModalInput] = React.useState("");

  // SVG Rectangle (clipped to human shape) for human shape filling
  // Utilised the rectangle's height and slowly increases it while
  // Reducing Y placement by equal amounts to achieve correct effect
  const [recHeight, setRecHeight] = React.useState(0);
  const [recY, setRecY] = React.useState(0);

  // Function to store user intake via AsyncStorage
  const saveUserIntake = async (waterIntakeLevel) => {
    try {
      await AsyncStorage.setItem("userId", waterIntakeLevel);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  // Function to read stored user intake value via AsyncStorage upon first render
  const readUserIntake = async () => {
    try {
      const userWater = await AsyncStorage.getItem("userId");

      if (userWater !== null) {
        setTargetWaterIntake(userWater);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Reads user intake from storage key via AsyncStorage upon first render
  React.useEffect(() => {
    readUserIntake();
  }, []);

  // Stores user intake via AsyncStorage on the same storage key
  React.useEffect(() => {
    saveUserIntake(targetWaterIntake.toString());
    setModalVisible(false);
  }, [targetWaterIntake]);

  // Changes the human fill for every water intake change or targeted water intake change
  React.useEffect(() => {
    const waterDeficitPercentage =
      (targetWaterIntake - waterIntake) / targetWaterIntake;
    setRecHeight(297 - 297 * waterDeficitPercentage);
    setRecY(297 - recHeight);
  }, [waterIntake, targetWaterIntake]);

  // Changes the y placement of rectangular fill after receiving height
  React.useEffect(() => {
    setRecY(297 - recHeight);
  }, [recHeight]);

  return (
    // Utilised safe area view for iOS notch coverage.
    // Handled status bar for Android using StatusBar method: currentHeight as paddingTop
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/*Water Drunk and 15 Goal Days Area*/}
      <View style={styles.mainArea}>
        <View style={styles.headerArea}>
          <WaterIntake waterIntake={waterIntake} />
        </View>

        {/*Human SVG and Target Intake Area*/}
        <View style={styles.visualContainer}>
          <Human recHeight={recHeight} recY={recY} />
        </View>
        <TargetModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalInput={modalInput}
          setModalInput={setModalInput}
          setTargetWaterIntake={setTargetWaterIntake}
          targetWaterIntake={targetWaterIntake}
          recHeight={recHeight}
          recY={recY}
        />
      </View>
      {/*Cheering Text, Carousel, and Buttons Area*/}
      <View styles={styles.subArea}>
        <View style={styles.textWrapper}>
          <Text style={styles.subText}>Nice work! </Text>
          <Text style={styles.subText}>Keep it up!</Text>
        </View>

        {/* Carousel receives data from declared waterData and renders the items*/}
        <Carousel
          layout={"default"}
          data={waterData}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={80}
          itemHeight={200}
          firstItem={1}
          inactiveSlideOpacity={0.5}
          onSnapToItem={(index) => setSelected(index)}
        />

        {/* Intake Buttons Component receives the waterData prop with specific selected index*/}
        <IntakeButtons
          waterIntake={waterIntake}
          setWaterIntake={setWaterIntake}
          waterData={waterData[selected]}
        />
      </View>
    </SafeAreaView>
  );
}

// Arranged alphabetically for clarity
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#53bfef",
    paddingTop: Platform.OS === "android" ? Status.currentHeight : 0,
  },
  headerArea: {
    flex: 1,
  },
  mainArea: {
    flex: 1,
  },
  subArea: {
    flex: 1,
  },
  subText: {
    color: "#FFFFFF",
    fontSize: 20,
    alignSelf: "center",
  },
  textWrapper: {
    paddingTop: "15%",
  },
  visualContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  waterIntakeText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
  },
  waterIntakeScroll: {
    paddingTop: "30%",
    paddingBottom: "10%",
    paddingLeft: "5%",
    paddingRight: "5%",
    alignItems: "center",
  },
});
