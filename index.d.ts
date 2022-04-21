/// <reference types="typescript" />

type Callback = (_: any, success: any) => void;
export type Permissions = ["example"];

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
  isSubscribed: boolean;
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

export type Recommendation = {
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

// Health Permissions
export const healthPermissions: Permissions[];

// Point Health Kit
export function requestPermissions(): Promise<any>;
export function setupBackgroundListeners(): Promise<any>;
export function enableBackgroundListeners(): Promise<any>;
export function disableBackgroundListeners(): Promise<any>;
export function enableForegroundListeners(): Promise<any>;
export function disableForegroundListeners(): Promise<any>;

// PointSDK
export function setup(
  clientId: string,
  clientSecret: string,
  permissions: Permissions[],
  environment: string,
  callback: Callback
): void;
export function login(accessToken: string): Promise<any>;
export function logout(): Promise<any>;

// Point API
export function getUserData(): Promise<User>;
export function getUserWorkouts(offset: number): Promise<Workout[]>;
export function getUserWorkoutById(id: number): Promise<Workout>;
export function getWorkoutRecommendations(): Promise<Recommendation[]>;
export function getDailyHistory(offset: number): Promise<[{ date: Date; metrics: HealthMetric[] }]>;
export function setUserGoal(goal: Goal): Promise<User>;
export function setUserSpecificGoal(specificGoal: SpecificGoal): Promise<User>;
