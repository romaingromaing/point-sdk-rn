// main index.js

import { NativeModules } from "react-native";
const { PointSdkRn } = NativeModules;

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

export const InsightType = {
  ExertionOptimalAm: "exertion_optimal_am",
  ExertionOptimalPm: "exertion_optimal_pm",
  CalorieBurnOptimalAm: "calorie_burn_optimal_am",
  CalorieBurnOptimalPm: "calorie_burn_optimal_pm",
  DurationOptimalAm: "duration_optimal_am",
  DurationOptimalPm: "duration_optimal_pm",
  HrvDecreaseMedsev: "hrv_decrease_medsev",
  HrvDecreaseHisev: "hrv_decrease_hisev",
  RecordCaloriesBurned: "record_calories_burned",
  RecordExertionRate: "record_exertion_rate",
  RecordCaloriesBurnedAcrossAllWorkoutTypes: "record_calories_burned_across_all_workout_types",
  RecordExertionRateAcrossAllWorkoutTypes: "record_exertion_rate_across_all_workout_types",
  MostEfficientWorkoutType: "most_efficient_workout_type",
  LongestWorkoutType: "longest_workout_type",
  AvgWorkoutCaloriesBurned: "avg_workout_calories_burned",
  AvgWorkoutExertionRate: "avg_workout_exertion_rate",
  UsualWorkoutTime: "usual_workout_time",
  OptimalWorkoutRoutine: "optimal_workout_routine",
  DurationTip: "duration_tip",
  WorkoutHrZone5HighMinutes: "workout_hr_zone5_high_minutes",
  WeekHrZonesLowMinutesBurnFat: "week_hr_zones_low_minutes_burn_fat",
  WeekHrZonesLowMinutesBurnCarb: "week_hr_zones_low_minutes_burn_carb",
  WeekHrZonesHighMinutesBurnCarb: "week_hr_zones_high_minutes_burn_carb",
  WeekHrZone5HighMinutes: "week_hr_zone5_high_minutes"
}

PointSdkRn.allQueryTypes = Object.values(QueryType);
PointSdkRn.allFitbitScopes = Object.values(FitbitScopes);

export default PointSdkRn;
