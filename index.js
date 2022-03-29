// main index.js

import { NativeModules } from "react-native";

if (!NativeModules) {
  throw new Error("Native modules not found");
}

const { PointSdkRn } = NativeModules;

export default PointSdkRn;
