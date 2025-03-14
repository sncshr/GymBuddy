# GymBuddy Mobile App

GymBuddy is a React Native mobile application that uses machine learning to detect and track workouts in real-time. The app uses a TensorFlow Lite model to classify different types of exercises and provide feedback on form and rep counting.

## Features

- **Real-time Workout Detection**: Uses the device camera to detect and classify different types of exercises
- **Form Feedback**: Provides real-time feedback on exercise form
- **Rep Counting**: Automatically counts repetitions for tracked exercises
- **Workout History**: Tracks and displays workout history and statistics
- **User Authentication**: Secure login and registration system
- **Personalized Experience**: Customizable user profiles and workout preferences

## Supported Exercises

- Pushups
- Squats
- Situps
- Lunges
- Bicep Curls
- Tricep Extensions
- Dumbbell Rows
- Jumping Jacks
- Dumbbell Shoulder Press
- Lateral Shoulder Raises

## Tech Stack

- **Frontend**: React Native with TypeScript
- **State Management**: React Context API
- **UI Components**: React Native Paper
- **Navigation**: React Navigation
- **Machine Learning**: TensorFlow.js and TensorFlow Lite
- **Camera Integration**: React Native Vision Camera
- **Local Storage**: AsyncStorage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- React Native development environment set up
- Android Studio or Xcode (for running on emulators)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gymbuddy-mobile.git
   cd gymbuddy-mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install pods (for iOS):
   ```
   cd ios && pod install && cd ..
   ```

4. Start the Metro bundler:
   ```
   npm start
   ```

5. Run on Android or iOS:
   ```
   npm run android
   # or
   npm run ios
   ```

## Project Structure

```
src/
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── models/         # TensorFlow model files
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # API and other services
└── utils/          # Utility functions and constants
```

## Machine Learning Model

The app uses a TensorFlow Lite model (`gymbuddy_classifier_v3.tflite`) that has been trained to recognize different types of exercises based on body keypoints. The model takes in 36 values representing the x and y coordinates of 18 body keypoints and outputs the probability of each exercise type.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TensorFlow team for providing the tools to build and deploy ML models
- React Native community for the amazing framework and libraries
- All contributors who have helped to make this project better
