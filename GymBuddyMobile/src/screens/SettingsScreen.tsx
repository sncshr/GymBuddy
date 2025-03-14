import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, Switch, Divider, Button, Text, Dialog, Portal, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../utils/theme';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cameraQualityDialogVisible, setCameraQualityDialogVisible] = useState(false);
  const [cameraQuality, setCameraQuality] = useState('medium');

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);
  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const showCameraQualityDialog = () => setCameraQualityDialogVisible(true);
  const hideCameraQualityDialog = () => setCameraQualityDialogVisible(false);

  const handleClearData = () => {
    Alert.alert(
      'Clear App Data',
      'Are you sure you want to clear all app data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All app data has been cleared.'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <List.Section>
        <List.Subheader>General</List.Subheader>
        <List.Item
          title="Notifications"
          description="Receive workout reminders and updates"
          left={props => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              color={theme.colors.primary}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Dark Mode"
          description="Use dark theme throughout the app"
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
              color={theme.colors.primary}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Sound Effects"
          description="Play sounds during workouts"
          left={props => <List.Icon {...props} icon="volume-high" />}
          right={() => (
            <Switch value={soundEnabled} onValueChange={toggleSound} color={theme.colors.primary} />
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Workout</List.Subheader>
        <List.Item
          title="Camera Quality"
          description={`Currently: ${
            cameraQuality === 'low'
              ? 'Low (480p)'
              : cameraQuality === 'medium'
              ? 'Medium (720p)'
              : 'High (1080p)'
          }`}
          left={props => <List.Icon {...props} icon="camera" />}
          onPress={showCameraQualityDialog}
        />
        <Divider />
        <List.Item
          title="Workout History"
          description="View and manage your workout history"
          left={props => <List.Icon {...props} icon="history" />}
          onPress={() => Alert.alert('Workout History', 'This feature will be available soon.')}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Edit Profile"
          description="Update your personal information"
          left={props => <List.Icon {...props} icon="account-edit" />}
          onPress={() => Alert.alert('Edit Profile', 'This feature will be available soon.')}
        />
        <Divider />
        <List.Item
          title="Change Password"
          description="Update your account password"
          left={props => <List.Icon {...props} icon="lock-reset" />}
          onPress={() => Alert.alert('Change Password', 'This feature will be available soon.')}
        />
        <Divider />
        <List.Item
          title="Clear App Data"
          description="Delete all locally stored data"
          left={props => <List.Icon {...props} icon="delete" color={theme.colors.error} />}
          onPress={handleClearData}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>About</List.Subheader>
        <List.Item
          title="Version"
          description="1.0.0"
          left={props => <List.Icon {...props} icon="information" />}
        />
        <Divider />
        <List.Item
          title="Terms of Service"
          left={props => <List.Icon {...props} icon="file-document" />}
          onPress={() => Alert.alert('Terms of Service', 'This feature will be available soon.')}
        />
        <Divider />
        <List.Item
          title="Privacy Policy"
          left={props => <List.Icon {...props} icon="shield-account" />}
          onPress={() => Alert.alert('Privacy Policy', 'This feature will be available soon.')}
        />
      </List.Section>

      <Portal>
        <Dialog visible={cameraQualityDialogVisible} onDismiss={hideCameraQualityDialog}>
          <Dialog.Title>Camera Quality</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={value => setCameraQuality(value)} value={cameraQuality}>
              <RadioButton.Item label="Low (480p)" value="low" />
              <RadioButton.Item label="Medium (720p)" value="medium" />
              <RadioButton.Item label="High (1080p)" value="high" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideCameraQualityDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.l,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.borderRadius.l,
    borderBottomRightRadius: theme.borderRadius.l,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SettingsScreen; 