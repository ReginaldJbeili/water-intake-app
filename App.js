import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import SmoothPicker from "react-native-smooth-picker";
const dataCity = [150, 250, 350];

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 20,
  1: 15,
  2: 10,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
  return (
    <View
      style={[
        styles.OptionWrapper,
        {
          opacity,
          borderColor: selected ? "#ABC9AF" : "transparent",
          width: vertical ? 190 : "auto",
        },
      ]}
    >
      <Text style={{ fontSize }}>{name}</Text>
    </View>
  );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
    />
  );
};
export default function App() {
  const [waterIntake, setWaterIntake] = React.useState(0);
  const [selected, setSelected] = React.useState(1);

  const addIntake = function (amount) {
    setWaterIntake(waterIntake + amount);
  };

  const subtractIntake = function (amount) {
    setWaterIntake(waterIntake - amount);
  };
  function handleChange(index) {
    setSelected(index);
    // refPicker.current.scrollToIndex({
    //   animated: false,
    //   index: index,
    //   viewOffset: -30,
    // });
  }

  // const refPicker = React.useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.mainArea}>
        <Text>{waterIntake}</Text>
        <Image style={styles.mainPic} source={require("./assets/human.png")} />
      </View>
      {/* <View>
        <Text onPress={() => addIntake(150)}>150</Text>
      </View>
      <View>
        <Text onPress={() => addIntake(250)}>250</Text>
      </View>
      <View>
        <Text onPress={() => addIntake(350)}>350</Text>
      </View> */}
      <View styles={styles.subArea}>
        <View style={styles.wrapperVertical}>
          <SmoothPicker
            horizontal={true}
            // refFlatList={refPicker}
            initialScrollToIndex={selected}
            onScrollToIndexFailed={() => {}}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            data={dataCity}
            scrollAnimation
            onSelected={({ item, index }) => handleChange(index)}
            renderItem={(option) => ItemToRender(option, selected, true)}
            magnet
          />
        </View>
        <View>
          <Text>{`Your selection is ${dataCity[selected]}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text
            style={styles.button}
            onPress={() => subtractIntake(dataCity[selected])}
          >
            -
          </Text>
          <Text
            style={styles.button}
            onPress={() => addIntake(dataCity[selected])}
          >
            +
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#53bfef",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  button: {
    fontSize: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  mainPic: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "#53bfef",
  },
  mainArea: {
    flex: 1,
  },
  subArea: {
    flex: 1,
  },
  wrapperVertical: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
  },
  OptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
  },
});
