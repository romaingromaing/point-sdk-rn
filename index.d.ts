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
  Birthday = "dateOfBirth",
  BodyMass = "bodyMass",
  LeanBodyMass = "leanBodyMass",
  BodyMassIndex = "bodyMassIndex",
  BodyTemperature = "bodyTemperature",
  BodyFatPercentage = "bodyFatPercentage",
  OxygenSaturation = "oxygenSaturation",
  RespiratoryRate = "respiratoryRate",
  BloodGlucose = "bloodGlucose",
  BloodPressure = "bloodPressure",
  BiologicalSex = "biologicalSex",
}

export enum InsightType {
  ExertionOptimalAm = "exertion_optimal_am",
  ExertionOptimalPm = "exertion_optimal_pm",
  CalorieBurnOptimalAm = "calorie_burn_optimal_am",
  CalorieBurnOptimalPm = "calorie_burn_optimal_pm",
  DurationOptimalAm = "duration_optimal_am",
  DurationOptimalPm = "duration_optimal_pm",
  HrvDecreaseMedsev = "hrv_decrease_medsev",
  HrvDecreaseHisev = "hrv_decrease_hisev",
  RecordCaloriesBurned = "record_calories_burned",
  RecordExertionRate = "record_exertion_rate",
  RecordCaloriesBurnedAcrossAllWorkoutTypes = "record_calories_burned_across_all_workout_types",
  RecordExertionRateAcrossAllWorkoutTypes = "record_exertion_rate_across_all_workout_types",
  MostEfficientWorkoutType = "most_efficient_workout_type",
  LongestWorkoutType = "longest_workout_type",
  AvgWorkoutCaloriesBurned = "avg_workout_calories_burned",
  AvgWorkoutExertionRate = "avg_workout_exertion_rate",
  UsualWorkoutTime = "usual_workout_time",
  OptimalWorkoutRoutine = "optimal_workout_routine",
  DurationTip = "duration_tip",
  WorkoutHrZone5HighMinutes = "workout_hr_zone5_high_minutes",
  WeekHrZonesLowMinutesBurnFat = "week_hr_zones_low_minutes_burn_fat",
  WeekHrZonesLowMinutesBurnCarb = "week_hr_zones_low_minutes_burn_carb",
  WeekHrZonesHighMinutesBurnCarb = "week_hr_zones_high_minutes_burn_carb",
  WeekHrZone5HighMinutes = "week_hr_zone5_high_minutes",
  ActivityLevel = "activity_level",
}

export enum FitbitScopes {
  Activity = "activity",
  Heartrate = "heartrate",
  Profile = "profile",
  Sleep = "sleep",
  Weight = "weight",
  CardioFitness = "cardio_fitness",
  Temperature = "temperature",
  RespiratoryRate = "respiratory_rate",
  OxygenSaturation = "oxygen_saturation",
}

export enum OuraScopes {
  Daily = "daily",
  HeartRate = "heartrate",
  Personal = "personal",
  Session = "session",
  Workout = "workout",
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

export type Insight = {
  id: string;
  type: InsightType;
  additionalFields: string;
  createdAt: string;
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

export enum HealthMetricType {
  RestingHR = "RestingHR",
  OneMinuteHRR = "OneMinuteHRR",
  ThreeMinuteHRR = "ThreeMinuteHRR",
  HRV = "HRV",
  Vo2Max = "Vo2Max",
  ActiveCalories = "ActiveCalories",
  BasalCalories = "BasalCalories",
  TotalCalories = "TotalCalories",
  WorkoutCalories = "WorkoutCalories",
  WorkoutDistance = "WorkoutDistance",
  WorkoutDuration = "WorkoutDuration",
  ExertionRate = "ExertionRate",
  MovementLevel = "MovementLevel",
  MinsHRZone1 = "MinsHRZone1",
  MinsHRZone2 = "MinsHRZone2",
  MinsHRZone3 = "MinsHRZone3",
  MinsHRZone4 = "MinsHRZone4",
  MinsHRZone12 = "MinsHRZone12",
  MinsHRZone23 = "MinsHRZone23",
  MinsHRZone34 = "MinsHRZone34",
  MinsHRZone45 = "MinsHRZone45",
  MinsHRZone5 = "MinsHRZone5",
  WorkoutMinsHRZone1 = "WorkoutMinsHRZone1",
  WorkoutMinsHRZone2 = "WorkoutMinsHRZone2",
  WorkoutMinsHRZone3 = "WorkoutMinsHRZone3",
  WorkoutMinsHRZone4 = "WorkoutMinsHRZone4",
  WorkoutMinsHRZone12 = "WorkoutMinsHRZone12",
  WorkoutMinsHRZone23 = "WorkoutMinsHRZone23",
  WorkoutMinsHRZone34 = "WorkoutMinsHRZone34",
  WorkoutMinsHRZone45 = "WorkoutMinsHRZone45",
  WorkoutMinsHRZone5 = "WorkoutMinsHRZone5",
  MindfulMinutes = "MindfulMinutes",
  AvgWorkoutHR = "AvgWorkoutHR",
  MinWorkoutHR = "MinWorkoutHR",
  MaxWorkoutHR = "MaxWorkoutHR",
  SleepDuration = "SleepDuration",
  SleepDurationInbed = "SleepDurationAwake",
  SleepDurationAwake = "SleepDurationAwake",
  SleepDurationAsleep = "SleepDurationAsleep",
  TotalWorkoutDuration = "TotalWorkoutDuration",
  TotalMinsHRZone12 = "TotalMinsHRZone12",
  TotalMinsHRZone34 = "TotalMinsHRZone34",
  WeeklyAvgWorkoutHR = "WeeklyAvgWorkoutHR",
  WeeklyExertionRate = "WeeklyExertionRate",
  DailyWorkoutDuration = "DailyWorkoutDuration",
  Weight = "Weight",
  SleepEfficiency = "SleepEfficiency",
  SleepLatency = "SleepLatency",
  SleepStageDeep = "SleepStageDeep",
  SleepStageLight = "SleepStageLight",
  SleepStageREM = "SleepStageREM",
  SleepStageAwake = "SleepStageAwake",
  MaxHR = "MaxHR",
  SleepRestlessness = "SleepRestlessness",
}

// Point Health Kit
export function requestPermissions(): Promise<any>;
export function startAllListeners(): Promise<any>;
export function stopAllListeners(): Promise<any>;

// PointSDK
export function setup(
  clientId: string,
  clientSecret: string,
  environment: string,
  verbose: boolean,
  callback: Callback
): void;

export function setupHealthkitIntegration(queryTypes: QueryType[], callback: Callback): void;

/**
 * @deprecated Since version 1.3.0. It's not necessary to set up each integration manually anymore, this in now done automatically when setting up the SDK.
 */
export function setupFitbitIntegration(fitbitClientID: string, callback: Callback): void;
export function authenticateFitbit(callbackURLScheme: string, fitbitScopes?: FitbitScopes[]): Promise<any>;
export function revokeFitbitAuthentication(): Promise<any>;
export function isFitbitAuthenticated(): Promise<any>;

/**
 * @deprecated Since version 1.3.0. It's not necessary to set up each integration manually anymore, this in now done automatically when setting up the SDK.
 */
export function setupOuraIntegration(ouraClientID: string, callback: Callback): void;
export function authenticateOura(callbackURLScheme: string, ouraScopes?: OuraScopes[]): Promise<any>;
export function revokeOuraAuthentication(): Promise<any>;
export function isOuraAuthenticated(): Promise<any>;

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
export function getInsights(params: {
  types: InsightType[];
  from?: string;
  to?: string;
  offset?: number;
}): Promise<Insight[]>;
