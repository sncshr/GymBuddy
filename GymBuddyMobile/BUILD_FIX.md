# Build Fix Instructions

The build is failing due to Windows path length limitations. Here are several solutions you can try:

## Solution 1: Enable Shorter Paths

We've already added the following to `android/gradle.properties`:

```
android.enableShortenPaths=true
reanimated_disable_worklets=true
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
org.gradle.parallel=true
org.gradle.daemon=true
org.gradle.configureondemand=true
```

Try building again with:

```
npm run android
```

## Solution 2: Temporarily Remove Problematic Dependencies

If Solution 1 doesn't work, you can temporarily remove the problematic dependencies:

1. Remove react-native-reanimated:
   ```
   # Edit package.json and remove the line with "react-native-reanimated"
   npm install
   ```

2. If still failing, also remove react-native-vision-camera:
   ```
   # Edit package.json and remove the line with "react-native-vision-camera"
   npm install
   ```

3. Try building again:
   ```
   cd android
   .\gradlew.bat clean
   cd ..
   npm run android
   ```

## Solution 3: Move Project to a Shorter Path

If Solutions 1 and 2 don't work, you can use the provided batch file to move the project to a shorter path:

```
move_project.bat
```

Follow the prompts to move the project to a shorter path, then navigate to the new location and try building again.

## Solution 4: Manual Fix

If none of the above solutions work, you can try these manual steps:

1. Delete the node_modules folder:
   ```
   rm -rf node_modules
   ```

2. Clear npm cache:
   ```
   npm cache clean --force
   ```

3. Reinstall dependencies:
   ```
   npm install
   ```

4. Clean the Android build:
   ```
   cd android
   gradlew clean
   cd ..
   ```

5. Try building again:
   ```
   npm run android
   ```

## Solution 5: Enable Windows Long Path Support

Windows 10 has a feature to enable long path support:

1. Open Registry Editor (regedit)
2. Navigate to `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
3. Set `LongPathsEnabled` to `1`
4. Restart your computer

Then try building again.

## Solution 6: Use the Fix Script

We've provided a PowerShell script that can help you fix the build issues:

```
.\fix_build.ps1
```

Follow the prompts in the script to apply the fixes 