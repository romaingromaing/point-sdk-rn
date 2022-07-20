/// <reference types="typescript" />

type Callback = (_: any, success: any) => void;

export enum QueryType {
  RestingHeartRate = "restingHeartRate",
  HeartRate = "heartRate",
  ActiveEnergyBurned = "activeEnergyBurned",
  BasalEnergyBurned = "basalEnergyBurned",
  Workout = "workout",
  HeartRateVariabilitySDNN = "heartRateVariabilitySDNN",
  Vo2Max = "vo2Max",
  StepCount = "stepCount",
  MindfulSession = "mindfulSession",
  SleepAnalysis = "sleepAnalysis",
  Birthday = "birthday",
  BodyMass = "bodyMass",
}

export enum FitbitScopes {
  Activity = "activity",
  Heartrate = "heartrate",
  Location = "location",
  Nutrition = "nutrition",
  Profile = "profile",
  Settings = "settings",
  Sleep = "sleep",
  Social = "social",
  Weight = "weight",
}

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
  environment: string,
  verbose: boolean,
  callback: Callback
): void;

export function setupHealthkitIntegration(queryTypes: QueryType[], callback: Callback): void;

export function setupFitbitIntegration(fitbitClientID: string, callback: Callback): void;
export function authenticateFitbit(callbackURLScheme: string, fitbitScopes?: FitbitScopes[]): Promise<any>;
export function revokeFitbitAuthentication(): Promise<any>;
export function isFitbitAuthenticated(): Promise<any>;

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
