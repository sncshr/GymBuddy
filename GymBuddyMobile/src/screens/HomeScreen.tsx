import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList } from '../navigation/types';
import { theme, spacing, borderRadius } from '../utils/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthService from '../services/AuthService';

type HomeScreenNavigationProp = StackNavigationProp<MainTabParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const user = AuthService.getUser();

  const workoutTypes = [
    { name: 'Pushups', icon: 'arm-flex', color: '#FF5A5F' },
    { name: 'Squats', icon: 'human', color: '#4A90E2' },
    { name: 'Situps', icon: 'human-handsdown', color: '#50E3C2' },
    { name: 'Lunges', icon: 'run-fast', color: '#FFBD00' },
  ];

  const startWorkout = () => {
    navigation.navigate('Workout');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name || 'Fitness Enthusiast'}!</Text>
        <Text style={styles.subGreeting}>Ready for your workout?</Text>
      </View>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>Today's Stats</Title>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="fire" size={24} color={theme.colors.accent} />
              <Paragraph>0 kcal</Paragraph>
              <Text style={styles.statLabel}>Burned</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="clock-outline" size={24} color={theme.colors.primary} />
              <Paragraph>0 min</Paragraph>
              <Text style={styles.statLabel}>Workout</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="dumbbell" size={24} color={theme.colors.secondary} />
              <Paragraph>0</Paragraph>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <Button
          mode="contained"
          icon="camera"
          onPress={startWorkout}
          style={styles.startButton}
        >
          Start Workout
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout Types</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workoutTypesScroll}>
          {workoutTypes.map((workout, index) => (
            <TouchableOpacity key={index} onPress={startWorkout}>
              <View style={[styles.workoutTypeItem, { backgroundColor: workout.color }]}>
                <Icon name={workout.icon} size={32} color="#FFFFFF" />
                <Text style={styles.workoutTypeName}>{workout.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        <Card style={styles.recentWorkoutCard}>
          <Card.Content>
            <View style={styles.recentWorkoutHeader}>
              <View>
                <Title>Full Body Workout</Title>
                <Paragraph>Yesterday</Paragraph>
              </View>
              <Icon name="dumbbell" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.recentWorkoutStats}>
              <View style={styles.recentWorkoutStat}>
                <Text style={styles.recentWorkoutStatValue}>15 min</Text>
                <Text style={styles.recentWorkoutStatLabel}>Duration</Text>
              </View>
              <View style={styles.recentWorkoutStat}>
                <Text style={styles.recentWorkoutStatValue}>3</Text>
                <Text style={styles.recentWorkoutStatLabel}>Exercises</Text>
              </View>
              <View style={styles.recentWorkoutStat}>
                <Text style={styles.recentWorkoutStatValue}>120 kcal</Text>
                <Text style={styles.recentWorkoutStatLabel}>Burned</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: spacing.l,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: borderRadius.l,
    borderBottomRightRadius: borderRadius.l,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subGreeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  statsCard: {
    margin: spacing.l,
    elevation: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.m,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
  },
  section: {
    marginHorizontal: spacing.l,
    marginBottom: spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.m,
    color: theme.colors.text,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
  },
  workoutTypesScroll: {
    flexDirection: 'row',
  },
  workoutTypeItem: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
    padding: spacing.m,
  },
  workoutTypeName: {
    color: '#FFFFFF',
    marginTop: spacing.s,
    fontWeight: 'bold',
  },
  recentWorkoutCard: {
    marginBottom: spacing.m,
  },
  recentWorkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentWorkoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.m,
  },
  recentWorkoutStat: {
    alignItems: 'center',
  },
  recentWorkoutStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  recentWorkoutStatLabel: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
  },
});

export default HomeScreen; 