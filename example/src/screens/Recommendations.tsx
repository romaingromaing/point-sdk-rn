import React, {useState} from 'react';
import {Button, Text, View, FlatList} from 'react-native';
import PointSdkRn from 'react-native-point-sdk';

import {Item} from '../components/Item';

export function RecommendationsScreen() {
  const [recommendations, setRecommendations] = useState<
    PointSdkRn.Recommendation[]
  >([]);

  async function getWorkoutsRecommendations() {
    setRecommendations([]);
    setRecommendations(await PointSdkRn.getWorkoutRecommendations());
  }

  return (
    <View>
      <Button
        onPress={getWorkoutsRecommendations}
        title="Get Recommendations"
      />
      <FlatList
        data={recommendations}
        renderItem={({item}) => (
          <Item>
            <Text>ID: {item.id}</Text>
            <Text>
              <>Date: {item.date}</>
            </Text>
            <Text>Activity Name: {item.activityName}</Text>
            <Text>Activity ID: {item.activityId}</Text>
            <Text>Workout ID: {item.workoutId}</Text>
          </Item>
        )}
      />
    </View>
  );
}
