// main index.js

import { NativeModules } from "react-native";

export const QueryType = {
  RestingHeartRate: "restingHeartRate",
  HeartRate: "heartRate",
  ActiveEnergyBurned: "activeEnergyBurned",
  BasalEnergyBurned: "basalEnergyBurned",
  Workout: "workout",
  HeartRateVariabilitySDNN: "heartRateVariabilitySDNN",
  Vo2Max: "vo2Max",
  StepCount: "stepCount",
  MindfulSession: "mindfulSession",
  SleepAnalysis: "sleepAnalysis",
  Birthday: "birthday",
  BodyMass: "bodyMass",
};

export const FitbitScopes = {
  Activity: "activity",
  Heartrate: "heartrate",
  Location: "location",
  Nutrition: "nutrition",
  Profile: "profile",
  Settings: "settings",
  Sleep: "sleep",
  Social: "social",
  Weight: "weight",
};

export default NativeModules.PointSdkRn;
