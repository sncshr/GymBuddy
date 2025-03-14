import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Button, Surface, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme, spacing, borderRadius } from '../utils/theme';
import ModelService from '../services/ModelService';
import * as tf from '@tensorflow/tfjs';

const WorkoutScreen: React.FC = () => {
  const [isModelReady, setIsModelReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [workoutType, setWorkoutType] = useState<string>('unknown');
  const [repCount, setRepCount] = useState(0);
  const [feedback, setFeedback] = useState('Get ready');
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0); // 0: down, 1: up
  const [form, setForm] = useState(0); // 0: bad form, 1: good form
  
  const isFocused = useIsFocused();
  
  // Frame processing interval
  const frameProcessingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize TensorFlow.js and load model
    (async () => {
      try {
        await tf.ready();
        const modelReady = await ModelService.isReady();
        setIsModelReady(modelReady);
      } catch (error) {
        console.error('Failed to initialize TensorFlow.js', error);
        Alert.alert('Error', 'Failed to initialize the workout detection model');
      }
    })();

    // Cleanup
    return () => {
      if (frameProcessingInterval.current) {
        clearInterval(frameProcessingInterval.current);
      }
    };
  }, []);

  // Start/stop workout when screen focus changes
  useEffect(() => {
    if (!isFocused && isActive) {
      stopWorkout();
    }
  }, [isFocused]);

  const startWorkout = () => {
    if (!isModelReady) {
      Alert.alert('Model Not Ready', 'Please wait for the workout detection model to load');
      return;
    }

    setIsActive(true);
    setRepCount(0);
    setFeedback('Starting workout...');
    setProgress(0);
    setDirection(0);
    setForm(0);

    // Start frame processing
    frameProcessingInterval.current = setInterval(processFrame, 500);
  };

  const stopWorkout = () => {
    setIsActive(false);
    setFeedback('Workout stopped');
    
    if (frameProcessingInterval.current) {
      clearInterval(frameProcessingInterval.current);
      frameProcessingInterval.current = null;
    }
  };

  const processFrame = async () => {
    if (!isActive) return;
    simulateWorkoutDetection();
  };

  const simulateWorkoutDetection = () => {
    // Simulate workout type detection
    const workoutTypes = ['pushups', 'squats', 'situps', 'lunges'];
    const detectedType = workoutTypes[Math.floor(Math.random() * 2)]; // Only pushups or squats for now
    setWorkoutType(detectedType);

    // Simulate form detection
    const goodForm = Math.random() > 0.3; // 70% chance of good form
    setForm(goodForm ? 1 : 0);

    if (goodForm) {
      // Simulate rep counting
      if (direction === 0) {
        // Going down
        const newProgress = Math.min(progress + 0.1, 1);
        setProgress(newProgress);
        
        if (newProgress >= 1) {
          setDirection(1);
          setFeedback('Go up');
        } else {
          setFeedback('Go down');
        }
      } else {
        // Going up
        const newProgress = Math.max(progress - 0.1, 0);
        setProgress(newProgress);
        
        if (newProgress <= 0) {
          setDirection(0);
          setFeedback('Go down');
          setRepCount(prev => prev + 1);
        } else {
          setFeedback('Go up');
        }
      }
    } else {
      setFeedback('Fix your form');
    }
  };

  return (
    <View style={styles.container}>
      {isActive ? (
        <>
          <View style={styles.cameraSimulation}>
            <Icon name="camera" size={64} color="#FFF" />
            <Text style={styles.cameraText}>Camera Simulation</Text>
            <Text style={styles.cameraSubText}>
              (Real camera functionality is disabled in this demo)
            </Text>
          </View>
          
          <View style={styles.overlay}>
            {/* Workout info overlay */}
            <Surface style={styles.infoContainer}>
              <Text style={styles.workoutTypeText}>
                {workoutType !== 'unknown' ? workoutType.toUpperCase() : 'DETECTING...'}
              </Text>
              <Text style={styles.repCountText}>{repCount} reps</Text>
              <Text style={styles.feedbackText}>{feedback}</Text>
              <ProgressBar
                progress={progress}
                color={theme.colors.accent}
                style={styles.progressBar}
              />
            </Surface>

            {/* Stop button */}
            <TouchableOpacity style={styles.stopButton} onPress={stopWorkout}>
              <Icon name="stop-circle" size={64} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.startContainer}>
          <Icon name="dumbbell" size={64} color={theme.colors.primary} />
          <Text style={styles.startTitle}>Ready to workout?</Text>
          <Text style={styles.startSubtitle}>
            This is a simulated workout detection. The app will guide you through exercises
            and count your reps as if it were using the camera.
          </Text>
          <Button
            mode="contained"
            icon="play"
            onPress={startWorkout}
            style={styles.startButton}
            loading={!isModelReady}
            disabled={!isModelReady}
          >
            {isModelReady ? 'Start Workout Simulation' : 'Loading Model...'}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraSimulation: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#FFF',
    fontSize: 24,
    marginTop: 16,
  },
  cameraSubText: {
    color: '#CCC',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: spacing.l,
  },
  infoContainer: {
    padding: spacing.m,
    borderRadius: borderRadius.m,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  workoutTypeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  repCountText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: spacing.m,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
  },
  stopButton: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.l,
  },
  startTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: spacing.l,
  },
  startSubtitle: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: spacing.s,
    marginBottom: spacing.l,
  },
  startButton: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
    marginTop: spacing.m,
  },
  subText: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: spacing.s,
    textAlign: 'center',
    paddingHorizontal: spacing.l,
  },
});

export default WorkoutScreen; 