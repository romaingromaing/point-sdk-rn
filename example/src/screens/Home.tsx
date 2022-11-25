import React, {useEffect, useState} from 'react';
import {Platform, Button, Text, View} from 'react-native';
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
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpPeWtVSkFNZjc4M3E2NGtrM0phWCJ9.eyJodHRwczovL2FyZXlvdW9ucG9pbnQuY28vZW1haWwiOiJhbm55QGFlLnN0dWRpbyIsImlzcyI6Imh0dHBzOi8vcG9pbnQtYXBwLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDIyNTMxNDYxMDA2NDU3Mjk3MDkiLCJhdWQiOlsibG9jYWxob3N0IiwiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjkzODczNjYsImV4cCI6MTY2OTQ3Mzc2NiwiYXpwIjoiRmJsRlM1SE02QlNwZlJuSVFCRUdGUllPUWJISFd2eGkiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOltdfQ.aidfIE5WIJrVcOYifC4a9TO2DgjHAwMA1MRxJb9f_BY8Lf9UzUucaAktcbmS3DgBitQch6CqQETMu2iNbTSXw6jqVjruT3jP1IMoeOXoDRW5qdGI7aT3ROe6HYu3k4LK0RMcJwgWfL10Ozt6pU9LY4RkVkIyq8X9L4o3r2U3fZNR9ln1h4r81bdGRjgQ6N3hNOFTf6YUzQyRZhkW5dDHaJmi6dEdA5zpYZ_-xXfmRegErMl00oNQjvocpPK8d5YJ8c1E-RfiI8YU8P9XdYUCglJdR0PwY43Lxf99Y7dwSi6idTqKMX-LolT7ZovjKiRN8w6CVKaGlfLzLSU8FBJFRQ',
      );
      console.log('User token set!');
    } catch (error) {
      console.error(error);
    }
    try {
      const userData = await PointSdkRn.getUserData();

      if (!userData) {
        throw new Error('Token expired!');
      }
      console.log('User: ', JSON.stringify(userData));

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
      {Platform.OS === 'ios' && (
        <Button
          onPress={handleRequestPermissions}
          title="Request Permissions"
        />
      )}
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
