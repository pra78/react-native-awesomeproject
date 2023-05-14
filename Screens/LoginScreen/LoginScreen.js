import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [isReady, setIsReady] = useState(false);
  const { passwordHidden, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [shouldShowKeyboard, setShouldShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
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
          "Roboto-500": require("../../assets/fonts/Roboto-Medium.ttf"),
          "Roboto-400": require("../../assets/fonts/Roboto-Regular.ttf"),
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

  const keyboardHide = () => {
    setShouldShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, width: dimensions }}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/PhotoBG.jpg")}
        >
          <View style={styles.emptyView} />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View
              style={{ ...styles.form, bottom: shouldShowKeyboard ? 100 : 0 }}
            >
              <Text style={styles.header}>Вхід</Text>
              <TextInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                value={state.email}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={() => setShouldShowKeyboard(true)}
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={passwordHidden}
                value={state.password}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
                onFocus={() => setShouldShowKeyboard(true)}
              />
              <Pressable
                onPress={handlePasswordVisibility}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "white" : "#E8E8E8",
                  },
                  styles.showPasswordBtn,
                ]}
              >
                <Text>Показати</Text>
              </Pressable>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Вхід</Text>
              </TouchableOpacity>
              <Text style={styles.accountLink}>
                Немає аккаунта? Зареєструватись
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  emptyView: {
    backgroundColor: "transparent",
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    bottom: 0,
  },
  header: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-500",
    fontSize: 30,
  },
  input: {
    height: 50,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "#E8E8E8",
    marginBottom: 16,
    borderRadius: 8,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
    paddingRight: 16,
    fontFamily: "Roboto-400",
    fontSize: 16,
  },
  showPasswordBtn: {
    position: "absolute",
    bottom: 266,
    right: 32,
    color: "#1B4371",
    fontFamily: "Roboto-400",
    fontSize: 16,
    borderRadius: 8,
    padding: 6,
  },
  btn: {
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 43,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#FF6C00",
    borderColor: "#FF6C00",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-400",
    padding: 16,
  },
  accountLink: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    marginBottom: 111,
  },
});
