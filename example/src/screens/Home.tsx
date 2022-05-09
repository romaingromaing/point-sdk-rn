import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn from 'react-native-point-sdk';

export function HomeScreen() {
  const [user, setUser] = useState<PointSdkRn.User | null>(null);

  const handleRequestPermissions = async () => {
    try {
      const result = await PointSdkRn.requestPermissions();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      await PointSdkRn.setUserToken(
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..kvZcmZ7k56XA0fm5.8I8V0lMPeH_YDpiWv1lkQVv4qk98iAp2flyvHPbHQoLl4YzpT7grtKESjXTw5Ywu-w1FsN-Bp4kuw6VlZsnz3xbnxJRcdQ-DO2tdMlyEL8kE4DYQUh-PrKKhVYB4d7pBEg_9vwkj2KOZkVTIgm2cjkiif5-TY8hIoSgLrYHcmd5EC7FxcQ7N-iQh0FLoBFd5aayorcKrP-3LiQ0EpwKjzKk70O83QbvgVmhTYxw-VKKLHFRJcC311lqU2a186yG2wyv5ZkCaO3ogkaSb4vPVQhyJEQLVZSGcH-D-7hm6J98YBmXlBCuR9KL_Co3EM9Pc9Jikze-zbj-0yWgxgHMkTb529cvr9TzOnP1YKA7oRLXjvka_EVDKY2cpkGbj6x5oqTa3nPko.y7HFbRA_aQIa6DtoqCYUQQ',
      );
      const userData = await PointSdkRn.getUserData();
      console.log(userData);
      setUser(userData);
      console.log('Successfully logged in');
      await PointSdkRn.enableBackgroundListeners();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await PointSdkRn.logout();
      setUser(null);
      console.log('Successfully logged out');
      await PointSdkRn.disableBackgroundListeners();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {user && (
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Welcome, {user.email}!
        </Text>
      )}
      <Button onPress={handleRequestPermissions} title="Request Permissions" />
      <Button onPress={handleLogin} title="Login" />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
}
