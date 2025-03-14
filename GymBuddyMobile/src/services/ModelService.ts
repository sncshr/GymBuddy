import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'react-native-fs';
import { APP_CONFIG, WORKOUT_TYPES } from '../utils/constants';

class ModelService {
  private model: tf.LayersModel | null = null;
  private isModelReady: boolean = false;

  constructor() {
    this.loadModel();
  }

  private async loadModel() {
    try {
      // Wait for TensorFlow.js to be ready
      await tf.ready();
      console.log('TensorFlow.js is ready');

      // Load the model
      const modelPath = `${FileSystem.DocumentDirectoryPath}/${APP_CONFIG.MODEL_PATH}`;
      const modelExists = await FileSystem.exists(modelPath);

      if (!modelExists) {
        // Copy the model from the bundle to the document directory
        await FileSystem.copyFileAssets(APP_CONFIG.MODEL_PATH, modelPath);
      }

      // Load the model
      this.model = await tf.loadLayersModel(bundleResourceIO(modelPath, null));
      this.isModelReady = true;
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Failed to load model', error);
    }
  }

  public async isReady(): Promise<boolean> {
    return this.isModelReady;
  }

  private normalizeKeypoints(keypoints: number[]) {
    // Implementation of the normalization logic from the Python code
    // This is a simplified version, you'll need to adapt the full normalization logic
    // from the Python code
    return keypoints;
  }

  public async predict(imageData: Uint8Array): Promise<string> {
    if (!this.isModelReady || !this.model) {
      throw new Error('Model is not ready');
    }

    try {
      // Decode the image
      const imageTensor = decodeJpeg(imageData);
      
      // Process the image to extract keypoints (this would use a pose detection model)
      // For now, we'll just use dummy keypoints
      const dummyKeypoints = new Array(36).fill(0).map(() => Math.random());
      
      // Normalize the keypoints
      const normalizedKeypoints = this.normalizeKeypoints(dummyKeypoints);
      
      // Make prediction
      const inputTensor = tf.tensor2d([normalizedKeypoints], [1, 36]);
      const prediction = this.model.predict(inputTensor) as tf.Tensor;
      
      // Get the index of the highest probability
      const predictionData = await prediction.data();
      const maxIndex = predictionData.indexOf(Math.max(...Array.from(predictionData)));
      
      // Clean up tensors
      tf.dispose([imageTensor, inputTensor, prediction]);
      
      return WORKOUT_TYPES[maxIndex];
    } catch (error) {
      console.error('Prediction error', error);
      return 'unknown';
    }
  }
}

export default new ModelService(); 