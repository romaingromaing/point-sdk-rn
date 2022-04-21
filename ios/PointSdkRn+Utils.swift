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

  func workoutMapping(workout: Workout) -> [String : Any] {
    [
      "id": workout.id,
      "calories": workout.calories,
      "distance": workout.distance,
      "duration": workout.duration,
      "start": workout.start,
      "end": workout.end,
      "activityName": workout.activityName,
      "activityId": workout.activityId!,
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
        "value": 0.234982938551425,
        "variance": -0.49
      ],
      "endurance": [
        "value": 0.71349520313981,
        "variance": -0.29
      ],
      "recovery": [
        "value": 0.401195740351498,
        "variance": -0.35
      ],
      "strength": [
        "value": 0.398320577378379,
        "variance": -0.37
      ]
    ]
  }

  func userMapping(user: User) -> [String : Any] {
    [
      "id": user.id,
      "email": user.email!,
      "birthday": user.birthday!,
      "firstName": user.firstName!,
      "isSubscriber": user.isSubscriber!,
      "goal": user.goal?.rawValue as Any,
      "goalProgress": goalProgressMapping(goalProgress: user.goalProgress),
      "specificGoal": user.specificGoal?.rawValue as Any,
      "lastWorkout": workoutMapping(workout: user.lastWorkout!)
    ]
  }
}
