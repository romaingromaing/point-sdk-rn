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
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..iAW3qAA8I0Ekikcm.rfcOmXVe-xVJPHVOULGCA4J5Tva4JEBRbL-f8hzF3Yzyk51KFQCCCP4vK5Y-e3gmwlfRxMxxn40T3hdbOa2EOlcUL28lf5npX7x3aq5R4w-VKzi2cQFn6oJl_QK5NkAhi-NOzpV4xZwSunGtwU9Mr-Fb7tqn0UpaZF0J06LhvYg5zmrh89W0DbsZDzx1TSKVfdYwbGb3XQ1z_zdBgsCEAWDI6zuoGAGqxlc3xDV3joFGzP2FDWxpNfqs0kLV1vps4JH-7FjmW4JRV3_3AsbA11MoIUxK89bxSZjegMyGPfhq19qJGpvlEZ_iLHXlYCS-lSd9_jAOCDsOkaaTUhMrOoiPSgbs8_t3c3VArqvFzOP0kuVWB2soVZZKRZWTovCkeERXjA9n.yDAJMGnmkjt_Fg6fWASjjQ',
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
