import Foundation
import PointSDK

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  var healthKit: HealthKitManager? { Point.healthKit }
  var dataManager: DataManager? { Point.dataManager }
  let healthQueryTypes: [HealthQueryType] = [
    HealthQueryType.restingHeartRate,
    HealthQueryType.heartRate,
    HealthQueryType.workout,
    HealthQueryType.heartRateVariabilitySDNN,
    HealthQueryType.vo2Max,
    HealthQueryType.mindfulSession,
    HealthQueryType.sleepAnalysis
  ]

  /**
   *  setup               Initialize PointSDK
   *  @param clientId     Client ID
   *  @param clientSecret Client Secret
   *  @param permissions  Permissions
   *  @param callback     Completion handler
   */
  @objc
  func setup(_ clientId: String, clientSecret: String, permissions: Array<String>?, environment: String, callback: RCTResponseSenderBlock) -> Void {
    var queriesTypes = HealthQueryType.allCases
    
    if let permissions = permissions {
      queriesTypes = permissions.compactMap { HealthQueryType(rawValue: $0) }
    }
    
    Point.verbose = true
    
    Point.setup(
      clientId: clientId,
      clientSecret: clientSecret,
      queryTypes: Set(queriesTypes),
      environment: .development
    )
    
    callback([NSNull(), true])
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
   *  constantsToExport	Expose constants to React Native
   */
  @objc
  func constantsToExport() -> [String: Any]! {
    return [
      "healthPermissions": HealthQueryType.allCases.map { $0.rawValue }
    ]
  }
}
