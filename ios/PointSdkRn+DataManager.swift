import Foundation
import PointSDK

@objc extension PointSdkRn {
  /**
   *  getUserData     Get user data
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
  @objc
  func getUserData(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let user = try await dataManager?.getUserData()
        resolve(
          [
            "id": user?.id,
            "email": user?.email,
            "firstName": user?.firstName,
            "birthday": user?.birthday,
            "goal": user?.goal,
            "specificGoal": user?.specificGoal
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
        let result = try await dataManager?.syncUserGoal(goal: mappedGoal)
        resolve(result)
      } catch {
        reject("setUserGoal", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  setUserSpecificGoal Set user specific goal
   *  @param specificGoal Specific goal
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
  @objc
  func setUserSpecificGoal(_ specificGoal: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let mappedSpecificGoal = specificGoalsMapping(type: specificGoal)
        let result = try await dataManager?.syncUserSpecificGoal(specificGoal: mappedSpecificGoal)
        resolve(result)
      } catch {
        reject("setUserSpecificGoal", error.localizedDescription, error)
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
        let workouts = try await dataManager?.getUserWorkouts(offset: offset)
        resolve(workouts?.map{
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
        if let workout = try await dataManager?.getWorkout(id: id) {
          resolve(
            [
              "id": workout.id,
              "calories": workout.calories,
              "duration": workout.duration,
              "start": workout.start,
              "end": workout.end
            ]
          )
        } else {
          resolve([])
        }
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
        let workouts = try await dataManager?.getDailyHistory(offset: offset)
        resolve(workouts?.map {
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
   *  getWorkoutRecommendations Retrieve workouts recommendations
   *  @param date               Date
   *  @param resolve            Resolve handler
   *  @param reject             Reject handler
   */
  @objc
  func getWorkoutRecommendations(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let recommendations = try await dataManager?.getWorkoutRecommendations(date: Date())
        
        resolve(
          recommendations?.map {
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
}
