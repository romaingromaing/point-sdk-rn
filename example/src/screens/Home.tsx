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
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..sSvSDhU0fVJDQnmn.9tGl_Y4ElqZpks_fhVQXpbHqF5ljWxw9IJ0mUwN6FmXpHV9PpSxT7v8uDuHV3VQM0u6EWibOYq3oHcwy9_BnH8lh814ucT0ofhS8sRMzA4G1R6T7k99liJcY7nqGIlzdHW9AOJ0ATweTcj2FQwSFoLU-zTfAPiAc6TWXf8KKZsCmXFFtKFK_x22oaW6EZBNa2Hyz7Kw-6cMVWy2CcVR9IgR3Ja-pfz4GEXEq2J8-Qkm31tt6FCAhGkYRVczaD_hJI_6WjO1YGv6br-5CjMWFSqJkSTv6VAziLg_lnR5WJS7Bvb_fflVd5uqfwstTvKOy8BXw7lY9voxcWDF_uROvxbSxnOhkgoynVCO7lhkAg66NryyKyOeIBYTVYBOLyYGdwkmxDLKQ.1QnhsDGshuvGvXAtCBB8Jg',
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
