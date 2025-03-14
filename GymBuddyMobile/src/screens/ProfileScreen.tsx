import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Title, Text, List, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { theme, spacing, borderRadius } from '../utils/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthService from '../services/AuthService';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const user = AuthService.getUser();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      // Navigation will be handled by the root navigator
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={100}
          label={(user?.name || 'User').substring(0, 2).toUpperCase()}
          color="#FFFFFF"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <Title style={styles.name}>{user?.name || 'User'}</Title>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Days Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <List.Section>
          <List.Subheader>Personal Information</List.Subheader>
          <List.Item
            title="Fitness Goals"
            description={user?.fitnessGoals || 'Not set'}
            left={props => <List.Icon {...props} icon="target" />}
          />
          <Divider />
          <List.Item
            title="Age"
            description={user?.age ? `${user.age} years` : 'Not set'}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <Divider />
          <List.Item
            title="Member Since"
            description={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
            left={props => <List.Icon {...props} icon="account-clock" />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>App Settings</List.Subheader>
          <List.Item
            title="Settings"
            left={props => <List.Icon {...props} icon="cog" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={navigateToSettings}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Help', 'Support information will be available here.')}
          />
          <Divider />
          <List.Item
            title="About"
            left={props => <List.Icon {...props} icon="information" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('About', 'GymBuddy v1.0.0\nYour AI Workout Assistant')}
          />
        </List.Section>
      </View>

      <Button
        mode="outlined"
        icon="logout"
        onPress={handleLogout}
        style={styles.logoutButton}
        color={theme.colors.error}
      >
        Log Out
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: spacing.l,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: borderRadius.l,
    borderBottomRightRadius: borderRadius.l,
  },
  name: {
    color: '#FFFFFF',
    marginTop: spacing.m,
  },
  email: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.l,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.m,
    padding: spacing.m,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 12,
  },
  section: {
    marginTop: spacing.m,
  },
  logoutButton: {
    margin: spacing.l,
    borderColor: theme.colors.error,
  },
});

export default ProfileScreen; 