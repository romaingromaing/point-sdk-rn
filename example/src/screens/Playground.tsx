import React from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn from 'react-native-point-sdk';

export function PlaygroundScreen() {
  const getUserHealthMetrics = async () => {
    try {
      const data = await PointSdkRn.getHealthMetrics({
        filter: [
          'Vo2Max',
          'TotalWorkoutDuration',
          'TotalMinsHRZone12',
          'TotalMinsHRZone34',
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

  async function getUserRecommendations() {
    try {
      console.log(await PointSdkRn.getUserRecommendations());
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserTrends() {
    try {
      console.log(await PointSdkRn.getUserTrends());
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

  async function recommendationSeen() {
    try {
      console.log(await PointSdkRn.recommendationSeen(351));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        Open the console log to see the results
      </Text>
      <Button onPress={getUserTrends} title="Get User Trends" />
      <Button onPress={getUserHealthMetrics} title="Get User Health Metrics" />
      <Button onPress={getDailyHistory} title="Get Daily History" />
      <Button
        onPress={getUserRecommendations}
        title="Get User Recommendations"
      />
      <Button
        onPress={getWorkoutsRecommendations}
        title="Get Workout Recommendations"
      />
      <Button
        onPress={saveWorkoutRecommendation}
        title="Save Workout Recommendation"
      />
      <Button onPress={recommendationSeen} title="Mark Recommendation Seen" />
    </View>
  );
}
