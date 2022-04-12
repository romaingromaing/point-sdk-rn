import React, {useState} from 'react';
import {Button, Text, View, FlatList} from 'react-native';
import PointSdkRn from 'react-native-point-sdk';

import {Item} from '../components/Item';

export function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<PointSdkRn.Workout[]>([]);

  async function getWorkouts() {
    setWorkouts([]);
    setWorkouts(await PointSdkRn.getUserWorkouts(0));
  }

  async function getDailyHistory() {
    console.log(await PointSdkRn.getDailyHistory(0));
  }

  return (
    <View>
      <Button onPress={getWorkouts} title="Get Workouts" />
      <Button
        onPress={getDailyHistory}
        title="Get Daily History (Check Logs)"
      />
      <FlatList
        data={workouts}
        renderItem={({item}) => (
          <Item>
            <Text>ID: {item.id}</Text>
            <Text>Calories: {item.calories}</Text>
            <Text>Duration: {item.duration}</Text>
            <Text>
              <>Start: {item.start}</>
            </Text>
            <Text>
              <>End: {item.end}</>
            </Text>
          </Item>
        )}
      />
    </View>
  );
}
