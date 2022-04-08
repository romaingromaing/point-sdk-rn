/// <reference types="typescript" />

type Callback = (_: any, success: any) => void;
type Permissions = ["example"];

type User = {
  id: string;
  email: string;
  firstName: string;
  birthday: string;
  goal: string;
};

type Workout = {
  id: string;
  calories: number;
  distance: number;
  start: Date;
  end: Date;
};

export const healthPermissions: Permissions[];

// Setup
export function setup(
  clientId: string,
  clientSecret: string,
  permissions: Permissions[],
  callback: Callback
): void;

export function setupBackgroundListeners(): Promise<any>;
export function startBackgroundListeners(): Promise<any>;
export function stopBackgroundListeners(): Promise<any>;
export function requestPermissions(): Promise<any>;

// Auth
export function login(accessToken: string): Promise<any>;
export function logout(): Promise<any>;

// User Data
export function getUserData(): Promise<User>;
export function getUserWorkouts(): Promise<Workout>;
