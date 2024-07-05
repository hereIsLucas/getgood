import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PanGestureHandler, State, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';


interface SwipeGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeGesture: React.FC<SwipeGestureProps> = ({ onSwipeLeft, onSwipeRight }) => {
  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationX < -50) {
        onSwipeLeft();
      } else if (translationX > 50) {
        onSwipeRight();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleGesture}
    >
      <View style={styles.container}>
        <Text>Swipe here</Text>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default SwipeGesture;