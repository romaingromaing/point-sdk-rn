import Foundation
import PointSDK

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  /**
   *  setup               Initialize PointSDK
   *  @param clientId     Client ID
   *  @param clientSecret Client Secret
   *  @param permissions  Permissions
   *  @param callback     Completion handler
   */
  @objc
  func setup(_ clientId: String, clientSecret: String, permissions: Array<String>?, callback: RCTResponseSenderBlock) -> Void {
    var queriesTypes = HealthQueryType.allCases
    
    if let permissions = permissions {
      queriesTypes = permissions.compactMap { HealthQueryType(rawValue: $0) }
    }

    Point.setup(
      clientId: clientId, 
      clientSecret: clientSecret, 
      queryTypes: Set(queriesTypes),
      environment: .development
    )
    
    callback([NSNull(), true])
  }
  
  /**
   *  requestPermissions  Request HealthKit permissions
   *  @param permissions  Permisisons to request
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
  @objc
  func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        try await Point.healthKit?.requestAuthorizationsIfPossible()
        
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
         try await Point.login(accessToken: accessToken)
         resolve(true)
       } catch {
         reject("login", error.localizedDescription, error)
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
         try await Point.logout()
         resolve(true)
       } catch {
         reject("logout", error.localizedDescription, error)
       }
     }
   }
  
  /**
   *  getUserData     Get user data
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
   @objc
   func getUserData(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
     Task {
       do {
         let user = try await Point.dataManager.getUserData()
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
   *  startBackgroundListener  Start background listener
   *  @param resolve           Resolve handler
   *  @param reject            Reject handler
   */
   @objc
   func startBackgroundListener(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
     Task {
       do {
         guard let healthKitManager = Point.healthKit else { return }
         await healthKitManager.setupAllBackgroundQueries()
         let result = try await healthKitManager.enableAllBackgroundDelivery()
         resolve(result)
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
         guard let healthKitManager = Point.healthKit else { return }
         try await healthKitManager.disableAllBackgroundDelivery()
         resolve(true)
       } catch {
         reject("stopBackgroundListener", error.localizedDescription, error)
       }
     }
   }
  
  /**
   *  workouts        Retrieve workouts
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
   @objc
   func getUserWorkouts(_ offset: Int = 0, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
     Task {
       do {
         let workouts = try await Point.dataManager.getUserWorkouts(offset: offset)
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
