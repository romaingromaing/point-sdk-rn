import Foundation
import PointSDK

@objc(PointSdkRn)
class PointSdkRn: NSObject {
  func environmentsMapping(type: String) -> APIEnvironment {
    switch type {
    case "development":
      return .development
    case "staging":
      return .staging
    case "production":
      return .production
    default:
      return .development
    }
  }
  
  func goalsMapping(type: String) -> Goal {
    switch type {
    case "athleticPerformance":
      return .athleticPerformance
    case "weightLoss":
      return .weightLoss
    default:
      return .weightLoss
    }
  }
  
  /**
   *  setupBackgroundListeners Setup background listeners
   *  @param resolve           Resolve handler
   *  @param reject            Reject handler
   */
  @objc
  func setupBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        guard let healthKitManager = Point.healthKit else { return }
        await healthKitManager.setupAllBackgroundQueries()
        resolve(true)
      } catch {
        reject("setupBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  startBackgroundListeners Start background listeners
   *  @param resolve           Resolve handler
   *  @param reject            Reject handler
   */
  @objc
  func startBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        guard let healthKitManager = Point.healthKit else { return }
        let result = try await healthKitManager.enableAllBackgroundDelivery()
        resolve(result)
      } catch {
        reject("startBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  stopBackgroundListeners Stop background listener
   *  @param resolve          Resolve handler
   *  @param reject           Reject handler
   */
  @objc
  func stopBackgroundListeners(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        guard let healthKitManager = Point.healthKit else { return }
        try await healthKitManager.disableAllBackgroundDelivery()
        resolve(true)
      } catch {
        reject("stopBackgroundListeners", error.localizedDescription, error)
      }
    }
  }
  
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
    
    Point.setup(
      clientId: clientId,
      clientSecret: clientSecret,
      queryTypes: Set(queriesTypes),
      environment: environmentsMapping(type: environment)
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
   *  setUserGoal     Set user goal
   *  @param goal     Goal
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
  @objc
  func setUserGoal(_ goal: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let mappedGoal = goalsMapping(type: goal)
        let result = try await Point.dataManager.syncUserGoal(goal: mappedGoal)
        resolve(result)
      } catch {
        reject("setUserGoal", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getUserWorkouts Retrieve workouts
   *  @param offset   Offset
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
   *  getUserWorkoutById  Retrieve workout by ID
   *  @param id           Workout ID
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
  @objc
  func getUserWorkoutById(_ id: Int, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let workout = try await Point.dataManager.getWorkout(id: id)
        resolve(
          [
            "id": workout.id,
            "calories": workout.calories,
            "duration": workout.duration,
            "start": workout.start,
            "end": workout.end
          ]
        )
      } catch {
        reject("getUserWorkoutById", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getDailyHistory Retrieve daily history
   *  @param offset   Offset
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
  @objc
  func getDailyHistory(_ offset: Int = 0, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let workouts = try await Point.dataManager.getDailyHistory(offset: offset)
        resolve(workouts.map{
          [
            "date": $0.date,
            "metrics": $0.metrics.map {
              [
                "type": $0.type,
                "date": $0.date,
                "value": $0.value,
                "variance": $0.variance,
                "workoutId": $0.workoutId
              ]
            }
          ]
        })
      } catch {
        reject("getDailyHistory", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getWorkoutRecommendations  Retrieve workouts recommendations
   *  @param date                 Date
   *  @param resolve              Resolve handler
   *  @param reject               Reject handler
   */
  @objc
  func getWorkoutRecommendations(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let recommendations = try await Point.dataManager.getWorkoutRecommendations(date: Date())
        
        resolve(
          recommendations.map {
            [
              "id": $0.id,
              "date": $0.date,
              "activityId": $0.activityId,
              "activityName": $0.activityName,
              "savedAt": $0.savedAt,
              "workoutId": $0.workoutId,
              "completedAt": $0.completedAt,
              "createdAt": $0.createdAt,
              "savedAt": $0.savedAt
            ]
          }
        )
      } catch {
        reject("getWorkoutRecommendations", error.localizedDescription, error)
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
