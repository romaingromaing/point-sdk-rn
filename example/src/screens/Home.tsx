import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn, {FitbitScopes, OuraScopes} from 'react-native-point-sdk';

export function HomeScreen() {
  const [user, setUser] = useState<PointSdkRn.User | null>(null);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleRequestPermissions = async () => {
    try {
      const result = await PointSdkRn.requestPermissions();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFitbit = async () => {
    try {
      const result = await PointSdkRn.authenticateFitbit('sampleapp', [
        FitbitScopes.Activity,
        FitbitScopes.Heartrate,
        FitbitScopes.Profile,
      ]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOura = async () => {
    try {
      const result = await PointSdkRn.authenticateOura('sampleapp', [
        OuraScopes.HeartRate,
        OuraScopes.Workout,
      ]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      await PointSdkRn.setUserToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOiJQb2ludCBPcmciLCJvcmdJZCI6NDQsInN1YiI6InBvaW50fDYyOThkYjZjZGM0ZGVhMDA2OGQ4NDUyYyIsImlhdCI6MTY2NTUyMzIwNywiZXhwIjoxNjY1NjA5NjA3fQ.73rNcr9SmKK2M01S2AEyqpvVyN1hiFEe4TaBPi2WtVg',
      );
      const userData = await PointSdkRn.getUserData();

      if (!userData) {
        throw new Error('Token expired!');
      }

      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await PointSdkRn.logout();
      setUser(null);
      console.log('Successfully logged out');
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
      <Button onPress={handleFitbit} title="Authenticate Fitbit" />
      <Button onPress={handleOura} title="Authenticate Oura" />
      {user ? (
        <Button onPress={handleLogout} title="Logout" />
      ) : (
        <Button onPress={handleLogin} title="Login" />
      )}
    </View>
  );
}
