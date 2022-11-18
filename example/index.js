/**
 * @format
 */

import {AppRegistry} from 'react-native';
import PointSdkRn, {QueryType} from 'react-native-point-sdk';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => {
  PointSdkRn.setup('8LBpmn8YYvWZ0MX-EyBx51O39Pd9u0csvVl5', 'bar', 'development', true, () =>
    console.log('Setup completed!'),
  );

  PointSdkRn.setupHealthkitIntegration(
    [
      QueryType.HeartRate,
      QueryType.StepCount,
      QueryType.ActiveEnergyBurned,
      QueryType.BasalEnergyBurned,
      QueryType.Workout,
      QueryType.LeanBodyMass,
      QueryType.BodyMassIndex,
      QueryType.BodyTemperature,
      QueryType.BodyFatPercentage,
      QueryType.OxygenSaturation,
      QueryType.RespiratoryRate,
      QueryType.BloodGlucose,
      QueryType.BloodPressure,
      QueryType.Birthday,
      QueryType.BiologicalSex
    ],
    () => console.log('Setup Health Kit completed!'),
  );

  PointSdkRn.startAllListeners();

  return App;
});
