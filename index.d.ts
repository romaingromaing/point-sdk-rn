/// <reference types="typescript" />

type Callback = (_: any, success: any) => void;

export type Permissions = [
  "restingHeartRate",
  "heartRate",
  "activeEnergyBurned",
  "basalEnergyBurned",
  "workout",
  "heartRateVariabilitySDNN",
  "vo2Max",
  "stepCount",
  "mindfulSession",
  "sleepAnalysis",
  "birthday",
  "bodyMass"
];

type GoalProgressKey = "overral" | "endurance" | "recovery" | "strength";

type GoalProgressValue = {
  value: number;
  variance: number;
};

export type User = {
  id: string;
  email: string;
  birthday: string;
  firstName: string;
  isSubscriber: boolean;
  goal: string;
  goalProgress: Record<GoalProgressKey, GoalProgressValue>;
  specificGoal: string;
  lastWorkout: Workout;
};

export type WorkoutRatings = {
  difficulty: number;
  energy: number;
  instructor: number;
};

export type Workout = {
  id: number;
  calories: number;
  distance: number;
  duration: number;
  start: string;
  end: string;
  activityName: string;
  activityId: number;
  ratings: WorkoutRatings;
};

export type HealthMetric = {
  type: string;
  date: string;
  value: number;
  variance: number;
  workoutId: number;
};

export type WorkoutRecommendation = {
  id: number;
  date: string;
  activityId: number;
  activityName: string;
  workoutId: number;
  completedAt: string;
  createdAt: string;
  savedAt: string;
};

export enum Goal {
  WeightLoss = "weightLoss",
  AthleticPerformance = "athleticPerformance",
}

export enum SpecificGoal {
  BuildLeanMuscle = "buildLeanMuscle",
  LoseWeight = "loseWeight",
  PrepareForEvent = "prepareForEvent",
  AccomplishMore = "accomplishMore",
  MaintainHealth = "maintainHealth",
}

export type HealthMetricType =
  | "RestingHR"
  | "OneMinuteHRR"
  | "ThreeMinuteHRR"
  | "HRV"
  | "Vo2Max"
  | "ActiveCalories"
  | "BasalCalories"
  | "TotalCalories"
  | "WorkoutCalories"
  | "WorkoutDistance"
  | "WorkoutDuration"
  | "ExertionRate"
  | "MovementLevel"
  | "MinsHRZone1"
  | "MinsHRZone2"
  | "MinsHRZone3"
  | "MinsHRZone4"
  | "MinsHRZone12"
  | "MinsHRZone23"
  | "MinsHRZone34"
  | "WorkoutMinsHRZone1"
  | "WorkoutMinsHRZone2"
  | "WorkoutMinsHRZone3"
  | "WorkoutMinsHRZone4"
  | "WorkoutMinsHRZone12"
  | "WorkoutMinsHRZone23"
  | "WorkoutMinsHRZone34"
  | "MindfulMinutes"
  | "AvgWorkoutHR"
  | "MinWorkoutHR"
  | "MaxWorkoutHR"
  | "SleepDuration"
  | "SleepDurationInbed"
  | "SleepDurationAsleep"
  | "TotalWorkoutDuration"
  | "TotalMinsHRZone12"
  | "TotalMinsHRZone34"
  | "WeeklyAvgWorkoutHR"
  | "WeeklyExertionRate"
  | "DailyWorkoutDuration"
  | "Weight"
  | "SleepEfficiency"
  | "SleepLatency"
  | "SleepStageDeep"
  | "SleepStageLight"
  | "SleepStageREM"
  | "SleepStageWake"
  | "SleepDurationInbed"
  | "SleepDurationAsleep";

export interface RecommendationAction {
  label: string;
  url: string;
}

export type InsightCategory =
  | "HeartLifetimeIncrease"
  | "Motivational"
  | "NeedRecovery"
  | "RoutineFreqOptimization"
  | "RoutineTimeOptimization"
  | "RoutineWorkoutTypeOptimization"
  | "TocayaDeal"
  | "TryHarder"
  | "WorkoutStreak";

export interface Recommendation {
  id: number;
  insightId: number;
  templateId: number;
  category: InsightCategory;
  description: string;
  actions: RecommendationAction[];
  cooldownEndsAt: Date;
  lastSeenAt: Date;
  dismissedAt: Date;
  icon: string;
  color: string;
}

export type TrendTypes =
  | "record_calories_burned_across_all_workout_types"
  | "most_efficient_workout_type"
  | "longest_workout_type"
  | "avg_workout_calories_burned"
  | "avg_workout_duration"
  | "usual_workout_time";

export interface Trend {
  id: string;
  type: TrendTypes;
  additionalFields: string;
}

// Health Permissions
export const healthPermissions: Permissions[];

// Point Health Kit
export function requestPermissions(): Promise<any>;
export function startBackgroundListeners(): Promise<any>;
export function disableBackgroundListeners(): Promise<any>;
export function enableForegroundListeners(): Promise<any>;
export function disableForegroundListeners(): Promise<any>;

// PointSDK
export function setup(
  clientId: string,
  clientSecret: string,
  permissions: Permissions[],
  environment: string,
  verbose: boolean,
  callback: Callback
): void;
export function setUserToken(accessToken: string): Promise<any>;
export function logout(): Promise<any>;

// Point API
export function getUserData(): Promise<User>;
export function getUserWorkouts(offset: number): Promise<Workout[]>;
export function getUserWorkoutById(id: number): Promise<Workout>;
export function getWorkoutRecommendations(date: string): Promise<WorkoutRecommendation[]>;
export function saveWorkoutRecommendation(id: number): Promise<any>;
export function rateWorkout(id: number, ratings: WorkoutRatings): Promise<Workout>;
export function getDailyHistory(offset: number): Promise<[{ date: Date; metrics: HealthMetric[] }]>;
export function setUserGoal(goal: Goal): Promise<User>;
export function setUserSpecificGoal(specificGoal: SpecificGoal): Promise<User>;
export function getHealthMetrics(params: {
  filter?: HealthMetricType[];
  workoutId?: number;
  date?: string;
}): Promise<HealthMetric[]>;
export function getUserRecommendations(): Promise<Recommendation[]>;
export function recommendationSeen(id: number): Promise<any>;
export function getUserTrends(): Promise<Trend[]>;
