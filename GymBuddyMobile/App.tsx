/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/utils/theme';
import RootNavigator from './src/navigation/RootNavigator';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
  'AsyncStorage has been extracted from react-native',
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  useEffect(() => {
    // Initialize TensorFlow.js
    const initTensorFlow = async () => {
      try {
        await tf.ready();
        console.log('TensorFlow.js is ready');
      } catch (error) {
        console.error('Failed to initialize TensorFlow.js', error);
      }
    };

    initTensorFlow();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <RootNavigator />
    </PaperProvider>
  );
};

export default App;
