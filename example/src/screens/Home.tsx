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
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..aEoOOlXaiBvA-pKD.icy656-k_pD5ctWWAgIeJA2ISjHLjSboRJhRUEA4f8rCVZbdpPBBGQJkoqAc35x_mbvzDoI5iI5T2x_fU68rENDwQUQH1zcooVx32lXP9Ckj-Uxh8LaSKT2r5HU487GoPsEkyueoucCWoJAmPiAn9Hhj2k_LYtrraN9pmW0kntKHsUBs3uQ3Cqq6jGq_3ihdXrm4tbZKmf5ykdm-wZbmQkFeNA-8sasou04SvJNMIno8MCGhRq7B0pZ8Zwdmrs8th7uCCspC-HmBPLedzhEpw1Bz769Gd4JXCeGwmGX0zU_VwzfDHDAI2HEYlIU1v0vyeDLTMAoCPmrT2JozEXtXgTfJ1zsn6lkZV1SdZvJTcdZrBYtCOYZC2YPZqWCDeU8IvEW4ZGom.kXYrVgN8PKWE3uaAvEbZ1g',
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
