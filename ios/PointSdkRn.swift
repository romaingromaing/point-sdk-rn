import Foundation
import PointSDK
import HealthKit

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  private let healthKitManager = PointSDK.healthKit
  private let dataManager = PointSDK.dataManager

  @objc static func requiresMainQueueSetup() -> Bool { return true }

  @objc func setup(_ apiKey: String, callback: RCTResponseSenderBlock) -> Void {
    NSLog("The ApiKey is: %@", apiKey)
    PointSDK.setup(apiKey: apiKey)
    callback([NSNull(), apiKey])
  }

  @objc func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await healthKitManager?.requestAuthorizationIfPossible(
          toRead: [
            // Characteristic
            HKCharacteristicType(.dateOfBirth),

            // Quantity
            HKQuantityType(.activeEnergyBurned),
            HKQuantityType(.basalEnergyBurned),
            HKQuantityType(.stepCount),
            HKQuantityType(.vo2Max),
            HKQuantityType(.heartRate),
            HKQuantityType(.restingHeartRate),
            HKQuantityType(.heartRateVariabilitySDNN),
            HKQuantityType(.distanceCycling),
            HKQuantityType(.distanceWalkingRunning),

            // Category
            HKCategoryType(.sleepAnalysis),
            HKCategoryType(.mindfulSession),

            // Series
            HKSeriesType.workoutType(),
            HKSeriesType.workoutRoute(),
          ]
        )
        resolve(true)
      } catch {
        reject("requestPermissions", "Error requesting permissions", error)
      }
    }
  }
}
