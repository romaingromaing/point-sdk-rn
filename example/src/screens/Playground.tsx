import React from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn, { HealthMetricType, InsightType } from 'react-native-point-sdk';

export function PlaygroundScreen() {
  const getUserHealthMetrics = async () => {
    try {
      const data = await PointSdkRn.getHealthMetrics({
        filter: [
          HealthMetricType.Vo2Max,
          HealthMetricType.Weight,
          HealthMetricType.TotalWorkoutDuration,
          HealthMetricType.TotalMinsHRZone12,
          HealthMetricType.MinsHRZone12,
          HealthMetricType.MinsHRZone5,
        ],
        date: new Date('2022-05-10').toISOString(),
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function getDailyHistory() {
    try {
      console.log(await PointSdkRn.getDailyHistory(0));
    } catch (error) {
      console.log(error);
    }
  }

  async function getWorkoutsRecommendations() {
    try {
      console.log(
        await PointSdkRn.getWorkoutRecommendations(new Date().toISOString()),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function saveWorkoutRecommendation() {
    try {
      console.log(await PointSdkRn.saveWorkoutRecommendation(2093));
    } catch (error) {
      console.log(error);
    }
  }

  async function getInsights() {
    try {
      console.log(await PointSdkRn.getInsights({ types: [InsightType.ActivityLevel]}));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        Open the console log to see the results
      </Text>
      <Button onPress={getUserHealthMetrics} title="Get User Health Metrics" />
      <Button onPress={getDailyHistory} title="Get Daily History" />
      <Button
        onPress={getWorkoutsRecommendations}
        title="Get Workout Recommendations"
      />
      <Button
        onPress={saveWorkoutRecommendation}
        title="Save Workout Recommendation"
      />
      <Button onPress={getInsights} title="Get Insights" />
    </View>
  );
}
