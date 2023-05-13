import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Svg, { Path, Rect, G } from "react-native-svg";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { transform: [{ translateX: -50 }] }]}>
          Публікації
        </Text>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#E8E8E8" : "white",
            },
            styles.svgLogout,
          ]}
        >
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M17 16L21 12L17 8"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M21 12H9"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
      <View style={styles.list}></View>
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#E8E8E8" : "white",
            },
            styles.svgFooter,
          ]}
        >
          <Svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Rect
              width="24"
              height="24"
              transform="translate(8 8)"
              fill="white"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 11H18V18H11V11Z"
              stroke="#212121"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 11H29V18H22V11Z"
              stroke="#212121"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 22H29V29H22V22Z"
              stroke="#212121"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 22H18V29H11V22Z"
              stroke="#212121"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#E8E8E8" : "white",
            },
            styles.svgFooter,
          ]}
        >
          <Svg
            width="70"
            height="40"
            viewBox="0 0 70 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G clip-path="url(#clip0_12_109)">
              <Rect width="70" height="40" rx="20" fill="#FF6C00" />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.5 13.5H34.5V19.5H28.5V20.5H34.5V26.5H35.5V20.5H41.5V19.5H35.5V13.5Z"
                fill="white"
              />
            </G>
          </Svg>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#E8E8E8" : "white",
            },
            styles.svgFooter,
          ]}
        >
          <Svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M28 29V27C28 24.7909 26.2091 23 24 23H16C13.7909 23 12 24.7909 12 27V29"
              stroke="#212121"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 19C22.2091 19 24 17.2091 24 15C24 12.7909 22.2091 11 20 11C17.7909 11 16 12.7909 16 15C16 17.2091 17.7909 19 20 19Z"
              stroke="#212121"
              stroke-opacity="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.1,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  headerText: {
    position: "absolute",
    color: "#212121",
    fontFamily: "Roboto-500",
    fontSize: 17,
    textAlign: "center",
    bottom: 0,
    left: "50%",
    padding: 11,
  },
  svgLogout: {
    position: "absolute",
    bottom: 10,
    right: 16,
  },
  list: {
    flex: 0.8,
  },
  footer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 9,
    gap: 31,
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
  },
  svgFooter: {
    height: 40,
    borderRadius: 8,
  },
});
