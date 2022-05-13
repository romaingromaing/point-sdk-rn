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
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..U5BtUmYzEwNiJuph.tZ5AmSyPNsTDhKgv5L97woCupFawUCqDMJn06u5MbNguANuxMIt3dpZf8Tiun-pkuLWoWgzwaMnEfnnk8Lrg5GxnNJ1cGlFgLQaAdDfKh6ggDWFdbjoIvKFAsqBwZ0AGwVjYBEnVTUXBWhGUgnh-wTxc3_jUUAF1-TqoVxewrnnmdmdCuC4lc2IWp9IFI9rhq1esLtJUrUCBsTIT7de736xGvqyThxkl7JL6LPzCKywlL88E2kHY1vKdau51-BmVLHlaBsl3U07O8kT4OKw8otnmkgEA3UW6LGob4FPFVOYDkytTSnt3p7SPh_7FsbrClfxpSIqAOEnF_4tKXVC7XcBnuEtL7plgSfmyki8Q1xcnvLsiNt0wq3RfMLeZ01cky9INu6ur.PKJJXqZwkPFF-6iU-RSFlQ',
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
