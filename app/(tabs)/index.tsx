import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform, Button
} from "react-native";
import React, { useEffect, useState } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Accelerometer } from "expo-sensors";
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [counter, setCounter] = useState(0);

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const roundToThreeDecimals = (num) => {
    return Math.round(num * 1000) / 1000;
  };

  const [subscription, setSubscription] = useState<any>(null);

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100); 

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      
      if (Math.abs(x) > 0.7 || Math.abs(y) > 0.7 || Math.abs(z) > 1.5) {
        setCounter(counter + 1);
        triggerHapticFeedback();
      }
    });
  
    return () => subscription && subscription.remove();
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Shake or Swipe down!</ThemedText>
        <HelloWave />
      </ThemedView>
      <View style={styles.container}>
        <Text style={styles.text}>
          Accelerometer:
        </Text>
        <Text style={styles.text}>x: {roundToThreeDecimals(data.x)}</Text>
        <Text style={styles.text}>y: {roundToThreeDecimals(data.y)}</Text>
        <Text style={styles.text}>z: {roundToThreeDecimals(data.z)}</Text>
        
      </View>
      <View>
        <Text style={styles.text}>
          {counter}
        </Text>

      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  //------------------------------
  text: {
    textAlign: "center",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
