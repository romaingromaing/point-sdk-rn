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
      await PointSdkRn.login(
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..n1JPAPhH30nI2DfP.q3X5ckA7VNKEaTKh6UKJW4L4FpaZAGJI8-R9Mbcx6UGjhsB02bkeIotqNlkDPUidnaHKOPdw3KHvF4Zrv92_WJB0v3F-BdncYEoXhHWl_os5S8rI40VA0tar6_aNtDYkvpyNLehp2kZmo8xklYH0BFiU8MaKfi1YNtuDMKUe0ZhiV5nr4mAMseKOUFWIXamQN6fD8o_ROtKCoXIu45n5IphXAewESjfvmK3GU4hheu5xmojZHBIZbFVc2uldZ2-FlmueGU25KinDD8tscCdkLUnXWd6jdhVZnbTNrmul5umcS_-ff27IFXe4Op8uafMSxUa___M8MNnHUsKW7xoKRrjPFpZ6V6fX3ONnRBxBTw3oG6jCEEzwxL7uWElqY06J64ICotJd.JtWFVTn-LGs7vykIy6CEJA',
      );
      const userData = await PointSdkRn.getUserData();
      setUser(userData);
      console.log('Successfully logged in');
      await PointSdkRn.startBackgroundListeners();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await PointSdkRn.logout();
      setUser(null);
      console.log('Successfully logged out');
      await PointSdkRn.stopBackgroundListeners();
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
