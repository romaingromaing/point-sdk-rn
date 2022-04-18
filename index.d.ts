/// <reference types="typescript" />

type Callback = (_: any, success: any) => void;
export type Permissions = ["example"];

export type User = {
  id: string;
  email: string;
  firstName: string;
  birthday: string;
  goal: string;
};

export type Workout = {
  id: string;
  calories: number;
  distance: number;
  duration: number;
  start: Date;
  end: Date;
};

export type HealthMetric = {
  type: string;
  date: Date;
  value: number;
  variance: number;
  workoutId: number;
};

export type Recommendation = {
  id: number;
  date: Date;
  activityId: number;
  activityName: string;
  workoutId: number;
  completedAt: Date;
  createdAt: Date;
  savedAt: Date;
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
export function setupBackgroundListeners(): Promise<any>;
export function enableBackgroundListeners(): Promise<any>;
export function disableBackgroundListeners(): Promise<any>;
export function requestPermissions(): Promise<any>;

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
