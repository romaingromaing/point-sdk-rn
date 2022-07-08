import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn, {FitbitScopes} from 'react-native-point-sdk';

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

  const handleLogin = async () => {
    try {
      await PointSdkRn.setUserToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOiJQb2ludCIsIm9yZ0lkIjo0NCwic3ViIjoicG9pbnR8NjFmODA0ZTNiYzc2YWQwMDcxY2Y3NzNjIiwiaWF0IjoxNjU3MjE2NjE2LCJleHAiOjE2NTczMDMwMTZ9.uL-H_qFClvQet3iEHprh7k0xy4jlYGRgr2g4eOXHNGA',
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
      {user ? (
        <Button onPress={handleLogout} title="Logout" />
      ) : (
        <Button onPress={handleLogin} title="Login" />
      )}
    </View>
  );
}
