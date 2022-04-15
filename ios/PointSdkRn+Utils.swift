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
}
