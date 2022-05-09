import Foundation
import PointSDK

extension PointSdkRn {

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

  func specificGoalsMapping(type: String) -> SpecificGoal {
    switch type {
    case "buildLeanMuscle":
      return .buildLeanMuscle
    case "loseWeight":
      return .loseWeight
    case "prepareForEvent":
      return .prepareForEvent
    case "accomplishMore":
      return .accomplishMore
    case "maintainHealth":
      return .maintainHealth
    default:
      return .buildLeanMuscle
    }
  }

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

  func workoutMapping(workout: Workout?) -> [String : Any] {
    guard let workout = workout else { return [:] }
    
    return [
      "id": workout.id,
      "calories": workout.calories,
      "distance": workout.distance,
      "duration": workout.duration,
      "start": workout.start,
      "end": workout.end,
      "activityName": workout.activityName,
      "activityId": workout.activityId,
      "ratings": [
        "difficulty": workout.ratings?.difficulty,
        "energy": workout.ratings?.energy,
        "instructor": workout.ratings?.instructor,
      ]
    ]
  }

  func goalProgressMapping(goalProgress: GoalProgress) -> [String : Any] {
    [
      "overral": [
        "value": goalProgress.overral.value,
        "variance": goalProgress.overral.variance
      ],
      "endurance": [
        "value": goalProgress.endurance.value,
        "variance": goalProgress.endurance.variance
      ],
      "recovery": [
        "value": goalProgress.recovery.value,
        "variance": goalProgress.recovery.variance
      ],
      "strength": [
        "value": goalProgress.strength.value,
        "variance": goalProgress.strength.variance
      ]
    ]
  }

  func userMapping(user: User?) -> [String : Any] {
    guard let user = user else { return [:] }

    return [
      "id": user.id,
      "email": user.email ?? "",
      "birthday": user.birthday ?? "",
      "firstName": user.firstName ?? "",
      "isSubscriber": user.isSubscriber ?? false,
      "goal": user.goal?.rawValue as Any,
      "goalProgress": goalProgressMapping(goalProgress: user.goalProgress),
      "specificGoal": user.specificGoal?.rawValue as Any,
      "lastWorkout": workoutMapping(workout: user.lastWorkout)
    ]
  }
  
  func metricMapping(metric: HealthMetric?) -> [String : Any] {
    guard let metric = metric else { return [:] }

    return [
      "type": metric.type,
      "date": metric.date,
      "value": metric.value,
      "variance": metric.variance,
      "workoutId": metric.workoutId
    ]
  }
}
