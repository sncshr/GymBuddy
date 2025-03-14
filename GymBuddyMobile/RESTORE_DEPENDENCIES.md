# Restoring Removed Dependencies

If you had to remove dependencies to get the app to build, you can add them back once the app is running. This document provides instructions on how to do that.

## Restoring react-native-reanimated

1. Edit `package.json` and add back the dependency:
   ```json
   "react-native-reanimated": "^3.6.1",
   ```

2. Install the dependency:
   ```
   npm install
   ```

3. Add the following to your `babel.config.js`:
   ```javascript
   module.exports = {
     presets: ['module:@react-native/babel-preset'],
     plugins: ['react-native-reanimated/plugin'],
   };
   ```

4. Clean the Android build:
   ```
   cd android
   .\gradlew.bat clean
   cd ..
   ```

5. Restart the Metro bundler:
   ```
   npm start -- --reset-cache
   ```

6. Build the app again:
   ```
   npm run android
   ```

## Restoring react-native-vision-camera

1. Edit `package.json` and add back the dependency:
   ```json
   "react-native-vision-camera": "^4.6.4",
   ```

2. Install the dependency:
   ```
   npm install
   ```

3. Add the required permissions to `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <uses-permission android:name="android.permission.CAMERA" />
   <uses-feature android:name="android.hardware.camera" />
   <uses-feature android:name="android.hardware.camera.autofocus" />
   ```

4. Clean the Android build:
   ```
   cd android
   .\gradlew.bat clean
   cd ..
   ```

5. Restart the Metro bundler:
   ```
   npm start -- --reset-cache
   ```

6. Build the app again:
   ```
   npm run android
   ```

## Troubleshooting

If you encounter issues after restoring the dependencies, try the following:

1. Make sure you have the latest versions of the dependencies.
2. Check if there are any compatibility issues between the dependencies.
3. Try using a shorter path for your project.
4. Enable Windows long path support as described in the BUILD_FIX.md file.
5. If all else fails, you may need to keep the dependencies removed and find alternative libraries that don't have the path length issue. 