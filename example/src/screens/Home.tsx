import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn, {FitbitScopes, OuraScopes} from 'react-native-point-sdk';

export function HomeScreen() {
  const [user, setUser] = useState<PointSdkRn.User | null>(null);
  const [ouraStatus, setOuraStatus] = useState<string>('unknown');

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

  const authenticateOura = async () => {
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

  const isOuraAuthenticated = async () => {
    try {
      setOuraStatus('fetching');
      const status = await PointSdkRn.isOuraAuthenticated();
      setOuraStatus(`${status}`);
    } catch (error: any) {
      console.log(error);
      setOuraStatus(`error: ${error.message}`);
    }
  };

  const revokeOuraAuthentication = async () => {
    try {
      await PointSdkRn.revokeOuraAuthentication();

      // Call isOuraAuthenticated to update the Oura Authentication Status
      isOuraAuthenticated();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      await PointSdkRn.setUserToken(
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpPeWtVSkFNZjc4M3E2NGtrM0phWCJ9.eyJodHRwczovL2FyZXlvdW9ucG9pbnQuY28vZW1haWwiOiJhbm55Kzc2QGFlLnN0dWRpbyIsImlzcyI6Imh0dHBzOi8vcG9pbnQtYXBwLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM3MjMzZDM1NTc5ZTUxMTZlODQ2YjBjIiwiYXVkIjpbImxvY2FsaG9zdCIsImh0dHBzOi8vcG9pbnQtYXBwLWRldi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY5MjIyMTE2LCJleHAiOjE2NjkzMDg1MTYsImF6cCI6IkZibEZTNUhNNkJTcGZSbklRQkVHRlJZT1FiSEhXdnhpIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbXX0.I82KBolYKjfq-wA7r6TMLOKZH42ro-Uz3CVM7W_GqhcRLGawqZ49qG5GePLjkOPr47iN3aAa74BeIu0FuuzBA1yMV5AT5ylUsiInjrztV6l53VeI1J9jK9WrjrnBHrza5fy2yuZsm16SNv0aWOSpGaEFbYD-qASPWLax6Ltbiv0ZrGW_wz8bG6xbquaBzaky_cQ72LiQZNaUncIQ2WqNlstfxMtlxiuL-VEYz4nI353yQVJ_xZ2A-QWD7waIbHlkFDvBRRmmniDPw7FglGUQPW37PQ7uxataHDSdS0ETOnmd4h9AtMLj3gVRrO-bqVOzuwIazS_XH_lYfofVPZPAng',
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
      <Text style={{fontSize: 16}}>
        Oura Authentication Status: {ouraStatus}
      </Text>
      <Button onPress={authenticateOura} title="Authenticate Oura" />
      <Button onPress={isOuraAuthenticated} title="Is Oura Authenticated?" />
      <Button
        onPress={revokeOuraAuthentication}
        title="Revoke Oura Authentication"
      />
    </View>
  );
}
