import Foundation
import PointSDK
import HealthKit

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  private let healthKitManager = PointSDK.healthKit
  private let dataManager = PointSDK.dataManager

  /** 
   *  requiresMainQueueSetup
   *  Necessary when constantsToExport is not available
   *  https://reactnative.dev/docs/native-modules-ios#exporting-constants
   */
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  /** 
   *  setup           Initialize PointSDK
   *  @param apiKey   API key
   *  @param callback Completion handler
   */
  @objc func setup(_ apiKey: String, callback: RCTResponseSenderBlock) -> Void {
    NSLog("The ApiKey is: %@", apiKey)
    PointSDK.setup(apiKey: apiKey)
    callback([NSNull(), apiKey])
  }

  /** 
   *  requestPermissions  Request HealthKit permissions
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
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

  /** 
   *  login               Login to Point
   *  @param accessToken  Access token
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
  @objc func login(_ accessToken: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await PointSDK.login(accessToken: accessToken)
        resolve(true)
      } catch {
        reject("login", "Error logging in", error)
      }
    }
  }

  /** 
   *  logout          Logout from Point
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
  @objc func logout(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await PointSDK.logout()
        resolve(true)
      } catch {
        reject("logout", "Error logging out", error)
      }
    }
  }
}
