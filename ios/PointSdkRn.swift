import Foundation
import PointSDK
import HealthKit

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  private let healthKitManager = PointSDK.healthKit
  private let dataManager = PointSDK.dataManager
  
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
   *  requestPermissions	Request HealthKit permissions
   *  @param permissions  Permisisons to request
   *  @param resolve     	Resolve handler
   *  @param reject      	Reject handler
   */
  @objc func requestPermissions(_ permissions: Array<String>?, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        var permissionsToRead = HealthQueryType.allCases
        
        if let permissions = permissions {
          permissionsToRead = permissions.compactMap { HealthQueryType(rawValue: $0) }
        }
        
        try await healthKitManager?.requestAuthorizationIfPossible(
          toRead: Set(permissionsToRead)
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
  
  @objc func startBackgroundListener(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await healthKitManager?.enableBackgroundDelivery {
            .heartRate(startDate: Calendar.current.date(byAdding: .hour, value: -12, to: .init())!)
        } updateHandler: { result in
            resolve(result)
        }
      } catch {
        reject("startBackgroundListener", "Error starting background listeners", error)
      }
    }
  }
  
  /**
   *  constantsToExport	Expose constants to React Native
   */
  @objc func constantsToExport() -> [String: Any]! {
    return [
      "healthPermissions": HealthQueryType.allCases.map { $0.rawValue }
    ]
  }
}
