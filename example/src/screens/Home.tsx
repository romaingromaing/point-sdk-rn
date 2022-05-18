import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import PointSdkRn from 'react-native-point-sdk';

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

  const handleLogin = async () => {
    try {
      await PointSdkRn.setUserToken(
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..K-3zLr9CIj6VgrDy.UibGK5NrgrOkDICuRL4F6zFA-Mus-9YvlPtNX0cUQES7ZGzQ3NpQB5ING4iJW49b29HrBOMxrpV97C7fAs8GSk9nr4JjPfW-5hnTs8qb5ax59PqpL_Ha64xV153CR0V1_e-yVke3GaZIv1M7Uft4M84d5FsES8TMeaPmSOZmx8sSwOKRy8WbGfFF8Eudz3qv1bp4fLjoKb0sSGI3Uh4ND6UY2_wVXWSMic4Xsp7YYqaz9_M7s9veoDlBa8ihipi_Q2A9a99lQ7N_eULe8iPkodmwVXs4wfMpvcH4PYK7b7yuN124GVIgA-xWYEjLXIyu0NJmr9dDzO1iss6-1hysHVUhW01EDknIK5Q721Nk74VtZ6TPnE6NHOq7sOZUOliG3nB5ANrc.A_h06PB5u9KJg7Ju5jrgiA',
      );
      const userData = await PointSdkRn.getUserData();

      if (!userData) {
        throw new Error('Token expired!');
      }

      setUser(userData);
      await PointSdkRn.enableBackgroundListeners();
    } catch (error) {
      console.error(error);
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
      {user ? (
        <Button onPress={handleLogout} title="Logout" />
      ) : (
        <Button onPress={handleLogin} title="Login" />
      )}
    </View>
  );
}
