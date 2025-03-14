import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Title, Chip, SegmentedButtons } from 'react-native-paper';
import { theme } from '../utils/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data for statistics
const mockWorkoutData = [
  { date: '2023-03-01', type: 'pushups', reps: 30, duration: 15 },
  { date: '2023-03-03', type: 'squats', reps: 25, duration: 12 },
  { date: '2023-03-05', type: 'pushups', reps: 35, duration: 18 },
  { date: '2023-03-07', type: 'lunges', reps: 20, duration: 10 },
  { date: '2023-03-10', type: 'squats', reps: 28, duration: 14 },
  { date: '2023-03-12', type: 'pushups', reps: 40, duration: 20 },
  { date: '2023-03-15', type: 'situps', reps: 45, duration: 22 },
];

const StatisticsScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Calculate summary statistics
  const totalWorkouts = mockWorkoutData.length;
  const totalReps = mockWorkoutData.reduce((sum, workout) => sum + workout.reps, 0);
  const totalDuration = mockWorkoutData.reduce((sum, workout) => sum + workout.duration, 0);
  
  // Count workout types
  const workoutTypeCounts: Record<string, number> = {};
  mockWorkoutData.forEach(workout => {
    workoutTypeCounts[workout.type] = (workoutTypeCounts[workout.type] || 0) + 1;
  });

  // Get most frequent workout type
  const mostFrequentType = Object.entries(workoutTypeCounts).reduce(
    (max, [type, count]) => (count > max.count ? { type, count } : max),
    { type: '', count: 0 }
  ).type;

  // Get workout type colors
  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case 'pushups':
        return '#FF5A5F';
      case 'squats':
        return '#4A90E2';
      case 'situps':
        return '#50E3C2';
      case 'lunges':
        return '#FFBD00';
      default:
        return theme.colors.primary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Workout Statistics</Text>
      </View>

      <View style={styles.timeRangeContainer}>
        <SegmentedButtons
          value={timeRange}
          onValueChange={setTimeRange}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <View style={styles.summaryContainer}>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <View style={styles.summaryItem}>
              <Icon name="calendar-check" size={24} color={theme.colors.primary} />
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryValue}>{totalWorkouts}</Text>
                <Text style={styles.summaryLabel}>Workouts</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.summaryCard}>
          <Card.Content>
            <View style={styles.summaryItem}>
              <Icon name="timer" size={24} color={theme.colors.accent} />
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryValue}>{totalDuration} min</Text>
                <Text style={styles.summaryLabel}>Duration</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.summaryCard}>
          <Card.Content>
            <View style={styles.summaryItem}>
              <Icon name="counter" size={24} color={theme.colors.secondary} />
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryValue}>{totalReps}</Text>
                <Text style={styles.summaryLabel}>Total Reps</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.workoutTypesCard}>
        <Card.Content>
          <Title>Workout Types</Title>
          <View style={styles.workoutTypesContainer}>
            {Object.entries(workoutTypeCounts).map(([type, count]) => (
              <Chip
                key={type}
                style={[styles.workoutTypeChip, { backgroundColor: getWorkoutTypeColor(type) }]}
                textStyle={styles.workoutTypeChipText}
                icon={type === mostFrequentType ? 'star' : undefined}
              >
                {`${type} (${count})`}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.historyCard}>
        <Card.Content>
          <Title>Recent Workouts</Title>
          {mockWorkoutData.slice(0, 5).map((workout, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <View
                  style={[
                    styles.workoutTypeIndicator,
                    { backgroundColor: getWorkoutTypeColor(workout.type) },
                  ]}
                />
                <View>
                  <Text style={styles.historyItemType}>
                    {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                  </Text>
                  <Text style={styles.historyItemDate}>
                    {new Date(workout.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View style={styles.historyItemRight}>
                <Text style={styles.historyItemReps}>{workout.reps} reps</Text>
                <Text style={styles.historyItemDuration}>{workout.duration} min</Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>
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
  timeRangeContainer: {
    padding: theme.spacing.m,
  },
  segmentedButtons: {
    backgroundColor: theme.colors.background,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTextContainer: {
    marginLeft: theme.spacing.s,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
  },
  workoutTypesCard: {
    margin: theme.spacing.m,
  },
  workoutTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.m,
  },
  workoutTypeChip: {
    margin: theme.spacing.xs,
  },
  workoutTypeChipText: {
    color: '#FFFFFF',
  },
  historyCard: {
    margin: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutTypeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.m,
  },
  historyItemType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  historyItemDate: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
  },
  historyItemRight: {
    alignItems: 'flex-end',
  },
  historyItemReps: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  historyItemDuration: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
  },
});

export default StatisticsScreen; 