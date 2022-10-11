/**
 * @format
 */

import {AppRegistry} from 'react-native';
import PointSdkRn, {QueryType} from 'react-native-point-sdk';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => {
  PointSdkRn.setup('foo', 'bar', 'development', true, () =>
    console.log('Setup completed!'),
  );

  PointSdkRn.setupHealthkitIntegration(
    [
      QueryType.HeartRate,
      QueryType.StepCount,
      QueryType.ActiveEnergyBurned,
      QueryType.BasalEnergyBurned,
      QueryType.Workout,
    ],
    () => console.log('Setup Health Kit completed!'),
  );

  PointSdkRn.setupFitbitIntegration('23895P', () =>
    console.log('Setup Fitbit completed!'),
  );

  PointSdkRn.setupOuraIntegration('D4NKI4CXAXA7KFNC', () =>
    console.log('Setup Oura completed!'),
  );

  PointSdkRn.startAllListeners();

  return App;
});
