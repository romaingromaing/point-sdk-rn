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
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..Ek9NznRepKZ7QBzL.I578l-7AMRdNj7SboydXG6fFmZmhb56L7rQC7wWvSiVrvqL_3C51muWiKzQLNZXo3LEVaD4nqumwzcWdWko-HE3NiEWMzpwgYlfuVMl5a4zWmXu9Pg7YSmnsetgAjPqzfV0tWO4tGSH_V9uCnT9HA1_9DNQVLVNXGBTE3aw2MezdlBaQZGm2lFXHWMkGHjvpubtiXBAyyZv5DegCmxqxTJeT1c59EhGDs0RgTQIqB8tvkZ0-LrZcMLOY8R__V7CjGDWcB36JEDkLzj50dFtNkmK0GP9bhomIJDYfyTn0lfCOPR5ZMCVsne5bUKPBQ37eXfAALel6ENt5_9oZV-c8cSRTiwwDKtqSnoAjHVVrjPCeBDq6PUCnDU2mRPF9Cf2AVdxfvNLS.wjrwUa2U8p8Vu3Dat6Oedg',
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
