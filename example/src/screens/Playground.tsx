import React from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn, {
  Goal,
  HealthMetricType,
  InsightType,
  SpecificGoal,
} from 'react-native-point-sdk';

export function PlaygroundScreen() {
  const getUserHealthMetrics = async () => {
    try {
      const data = await PointSdkRn.getHealthMetrics({
        filter: Object.values(HealthMetricType),
      });
      console.log(data);
      console.log(`Get User Health Metrics: Received ${data.length} results`);
      for (const metric of data) {
        console.log(metric);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getDailyHistory() {
    try {
      const data = await PointSdkRn.getDailyHistory(0);
      console.log('Get User Daily History: ', JSON.stringify(data));
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
      console.log(
        await PointSdkRn.getInsights({types: [InsightType.ActivityLevel]}),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function setUserGoal() {
    try {
      console.log(await PointSdkRn.setUserGoal(Goal.AthleticPerformance));
    } catch (error) {
      console.log(error);
    }
  }

  async function setUserSpecificGoal() {
    try {
      console.log(
        await PointSdkRn.setUserSpecificGoal(SpecificGoal.MaintainHealth),
      );
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
      <Button onPress={setUserGoal} title="Set User Goal" />
      <Button onPress={setUserSpecificGoal} title="Set User Specific Goal" />
    </View>
  );
}
