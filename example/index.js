/**
 * @format
 */

import {AppRegistry} from 'react-native';
import PointSdkRn from 'react-native-point-sdk';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => {
  PointSdkRn.setup(
    'foo',
    'bar',
    PointSdkRn.healthPermissions,
    'development',
    true,
    () => console.log('Setup completed!'),
  );

  PointSdkRn.setupBackgroundListeners();

  return App;
});
