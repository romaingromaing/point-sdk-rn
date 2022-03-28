import Foundation
import PointSDK

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  private let healthKitManager = PointSDK.healthKit
  private let dataManager = PointSDK.dataManager
  
  /**
   *  setup           Initialize PointSDK
   *  @param apiKey   API key
   *  @param callback Completion handler
   */
  @objc
  func setup(_ apiKey: String, callback: RCTResponseSenderBlock) -> Void {
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
  @objc
  func requestPermissions(_ permissions: Array<String>?, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
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
        reject("requestPermissions", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  login               Login to Point
   *  @param accessToken  Access token
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
  @objc
  func login(_ accessToken: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await PointSDK.login(accessToken: accessToken)
        resolve(true)
      } catch {
        reject("login", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getUserData       Get user data
   *  @param resolve  Resolve handler
   *  @param reject     Reject handler
   */
  @objc
  func getUserData(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let user = try await dataManager.getUserData()
        resolve(
          [
            "id": user?.id,
            "email": user?.email,
            "firstName": user?.firstName,
            "birthday": user?.birthday,
            "goal": user?.goal
          ]
        )
      } catch {
        reject("getUserData", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  logout          Logout from Point
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
  @objc
  func logout(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await PointSDK.logout()
        resolve(true)
      } catch {
        reject("logout", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  startBackgroundListener  Start background listener
   *  @param resolve           Resolve handler
   *  @param reject            Reject handler
   */
  @objc
  func startBackgroundListener(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await healthKitManager?.enableBackgroundDelivery {
          .heartRate(startDate: Calendar.current.date(byAdding: .hour, value: -12, to: .init())!)
        } updateHandler: { result in
          resolve(result)
        }
      } catch {
        reject("startBackgroundListener", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  stopBackgroundListener  Stop background listener
   *  @param resolve          Resolve handler
   *  @param reject           Reject handler
   */
  @objc
  func stopBackgroundListener(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await healthKitManager?.disableAllBackgroundDelivery()
        resolve(true)
      } catch {
        reject("startBackgroundListener", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  workouts              Retrieve workouts
   *  @param resolve  Resolve handler
   *  @param reject     Reject handler
   */
  @objc
  func getUserWorkouts(_ offset: Int = 0, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let workouts = try await dataManager.getUserWorkouts(offset: offset)
        resolve(workouts.map{
          [
            "id": $0.id,
            "calories": $0.calories,
            "duration": $0.duration,
            "start": $0.start,
            "end": $0.end
          ]
        })
      } catch {
        reject("getUserWorkouts", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  constantsToExport	Expose constants to React Native
   */
  @objc
  func constantsToExport() -> [String: Any]! {
    return [
      "healthPermissions": HealthQueryType.allCases.map { $0.rawValue }
    ]
  }
}
