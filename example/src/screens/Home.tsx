import React, { useEffect, useState } from 'react';
import { Platform, Button, Text, View } from 'react-native';
import PointSdkRn, { FitbitScopes, OuraScopes } from 'react-native-point-sdk';
import Config from "react-native-config";

export function HomeScreen() {
  const [user, setUser] = useState<PointSdkRn.User | null>(null);
  const [ouraStatus, setOuraStatus] = useState<string>('unknown');
  const [fitbitStatus, setFitbitStatus] = useState<string>('unknown');

  const handleRequestPermissions = async () => {
    try {
      const result = await PointSdkRn.requestPermissions();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const authenticateFitbit = async () => {
    try {
      const result = await PointSdkRn.authenticateFitbit('sampleapp',
        Object.values(FitbitScopes)
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const isFitbitAuthenticated = async () => {
    try {
      setFitbitStatus('fetching');
      const status = await PointSdkRn.isFitbitAuthenticated();
      console.log('isFitbitrAuthenticated:', status);
      setFitbitStatus(`${status}`);
    } catch (error: any) {
      console.log(error);
      setFitbitStatus(`error: ${error.message}`);
    }
  };

  const revokeFitbitAuthentication = async () => {
    try {
      await PointSdkRn.revokeFitbitAuthentication();

      // Call isFitbitAuthenticated to update the Fitbit Authentication Status
      isFitbitAuthenticated();
    } catch (error) {
      console.log(error);
    }
  };

  const authenticateOura = async () => {
    try {
      const result = await PointSdkRn.authenticateOura('sampleapp',
        Object.values(OuraScopes)
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const isOuraAuthenticated = async () => {
    try {
      setOuraStatus('fetching');
      const status = await PointSdkRn.isOuraAuthenticated();
      console.log('isOuraAuthenticated:', status);
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
      await PointSdkRn.setRefreshToken(
        `${Config.REFRESH_TOKEN}`,
        `${Config.USER_ID}`
      );
      console.log('User token set!');
    } catch (error) {
      console.error(error);
    }
    try {
      await isFitbitAuthenticated();
      await isOuraAuthenticated();
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
      setFitbitStatus('unknown');
      setOuraStatus('unknown');
      console.log('Successfully logged out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user && (
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Welcome, {user.email}!
        </Text>
      )}
      {Platform.OS === 'ios' && (
        <Button
          onPress={handleRequestPermissions}
          title="Request AH Permissions"
        />
      )}
      {user ? (
        <Button onPress={handleLogout} title="Logout" />
      ) : (
        <Button onPress={handleLogin} title="Login" />
      )}
      <Text style={{ fontSize: 16 }}>
        Fitbit Authentication Status: {fitbitStatus}
      </Text>
      <Button onPress={authenticateFitbit} title="Authenticate Fitbit" />
      <Button onPress={isFitbitAuthenticated} title="Is Fitbit Authenticated?" />
      <Button
        onPress={revokeFitbitAuthentication}
        title="Revoke Fitbit Authentication"
      />
      <Text style={{ fontSize: 16 }}>
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
