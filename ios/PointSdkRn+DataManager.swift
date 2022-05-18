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
        resolve(userMapping(user: user))
      } catch {
        reject("getUserData", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getUserTrends   Get user trends
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
  @objc
  func getUserTrends(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let trends = try await dataManager?.getUserTrends()
        resolve(trends?.map { trendMapping(trend: $0) })
      } catch {
        reject("getUserTrends", error.localizedDescription, error)
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
  func getUserWorkouts(_ offset: Int, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let workouts = try await dataManager?.getUserWorkouts(offset: offset)
        resolve(workouts?.map{ workoutMapping(workout: $0) })
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
        if let workout: Workout = try await dataManager?.getWorkout(id: id) {
          resolve(workoutMapping(workout: workout))
        } else {
          resolve([])
        }
      } catch {
        reject("getUserWorkoutById", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  rateWorkout     Rate workout by ID
   *  @param Workout  Workout ID
   *  @param Rating[] Ratings
   *  @param resolve  Resolve handler
   *  @param reject   Reject handler
   */
  @objc
  func rateWorkout(_ id: Int, ratings: [String : Int], resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        if let workout = try await dataManager?.getWorkout(id: id) {
          let ratings = WorkoutRatings(difficulty: ratings["difficulty"], energy: ratings["energy"], instructor: ratings["instructor"])
          let newWorkout = try await dataManager?.rate(workout: workout, ratings: ratings)
          resolve(workoutMapping(workout: newWorkout))
        } else {
          resolve(false)
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
            "metrics": $0.metrics.map { metricMapping(metric: $0) }
          ]
        })
      } catch {
        reject("getDailyHistory", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getWorkoutRecommendations Retrieve workouts recommendations
   *  @param string               Date
   *  @param resolve            Resolve handler
   *  @param reject             Reject handler
   */
  @objc
  func getWorkoutRecommendations(_ date: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let finalDate = date.fromIsoStringToDate()
        let recommendations = try await dataManager?.getWorkoutRecommendations(date: finalDate)
        
        resolve(recommendations?.map { workoutRecommendationMapping(recommendation: $0) })
      } catch {
        reject("getWorkoutRecommendations", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  saveWorkoutRecommendation Save workout recommendation
   *  @param integer            Recommendation ID
   *  @param resolve            Resolve handler
   *  @param reject             Reject handler
   */
  @objc
  func saveWorkoutRecommendation(_ id: Int, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let result = try await dataManager?.saveWorkoutRecommendation(id: id)
        resolve(result)
      } catch {
        reject("saveWorkoutRecommendation", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getUserRecommendations Retrieve user recommendations
   *  @param resolve            Resolve handler
   *  @param reject             Reject handler
   */
  @objc
  func getUserRecommendations(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let recommendations = try await dataManager?.getUserRecommendations()
        
        resolve(recommendations?.map { userRecommendationMapping(recommendation: $0) })
      } catch {
        reject("getUserRecommendations", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  recommendationSeen  Mark recommendation seen
   *  @param id           Recommendation ID
   *  @param resolve      Resolve handler
   *  @param reject       Reject handler
   */
  @objc
  func recommendationSeen(_ id: Int, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        let result = try await dataManager?.recommendationSeen(id: id)
        resolve(result)
      } catch {
        reject("recommendationSeen", error.localizedDescription, error)
      }
    }
  }
  
  /**
   *  getUserHealthMetrics  Retrieve user metrics
   *  @param array          filter
   *  @param int            workoutId
   *  @param string         date
   *  @param resolve        Resolve handler
   *  @param reject         Reject handler
   */
  @objc
  func getUserHealthMetrics(_ filter: Array<String>?, date: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    Task {
      do {
        var healthMetrics = HealthMetric.Kind.allCases

        if let filter = filter {
          healthMetrics = filter.compactMap { HealthMetric.Kind(rawValue: $0) }
        }

        let data = try await dataManager?.getHealthMetrics(
          filter: Set(healthMetrics),
          workoutId: nil,
          date: date.fromIsoStringToDate()
        )

        resolve(data?.map { metricMapping(metric: $0) })
      } catch {
        reject("getUserHealthMetrics", error.localizedDescription, error)
      }
    }
  }
}
