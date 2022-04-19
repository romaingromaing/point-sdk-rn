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
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..iwiG7d4Kr5qK8V_y.6MujIHsfvU-c-ruGc_e7IhWneAQjscwJaeQPOYA4g8BLPQ5zdGqIQGXb_n7BKWv7R3m_Gm5LUxpq_KGC4LUTi-BKWZ3K2BgV3c0GL-IyroXBEZfUCM2FBir5oeo-RtRmAN9JeOwaQ5inmpDx-q5g3IB_XtFXWQZwCZheiY8j4tRiWW7TO6pPD0yaQtNLPJTt5TjMXlMyNZ_Nsbgxds_ZVvqfpijslRt_SnYqvUl9KpvbRlRVCETCH80k9WhBVYl19cQi1gSeK7xZcK2DxS00i4Z3mD_1eoklhDWAPXBl_IQ4CLM1nSZiUpzMaUdnL1o_ZBGXK9_tO48HYu8EVctuTZrGt8eyVVLa9AkJgrrrBlqmYP3w.xl8iMZ1JVHvF2MCQg9b0SQ',
      );
      const userData = await PointSdkRn.getUserData();
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
