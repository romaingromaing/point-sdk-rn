package com.pointsdkrn

import co.areyouonpoint.pointsdk.domain.PointRepository
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.model.HealthMetricType
import co.areyouonpoint.pointsdk.domain.model.InsightType
import co.areyouonpoint.pointsdk.domain.model.WorkoutRatings
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.util.*

@OptIn(DelicateCoroutinesApi::class)
internal class PointSdkRepository(
    private val pointRepository: PointRepository,
) {

    fun getUserData(promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val user = pointRepository.getUser()?.toResponse()
                promise.resolve(user)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun getUserWorkouts(offset: Int, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val workouts = pointRepository.getUserWorkouts(offset)
                    .map { it.toResponse() }
                    .toReadableArray()

                promise.resolve(workouts)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun getUserWorkoutById(workoutId: Int, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val workout = pointRepository.getWorkout(workoutId).toResponse()
                promise.resolve(workout)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun getWorkoutRecommendations(date: Date, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val recommendations = pointRepository.getWorkoutRecommendations(date)
                    .map { it.toResponse() }
                    .toReadableArray()

                promise.resolve(recommendations)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun saveWorkoutRecommendation(workoutRecommendationId: Int, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val result = pointRepository.saveWorkoutRecommendation(workoutRecommendationId)

                promise.resolve(Arguments.createMap().apply {
                    putBoolean("result", result)
                })
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun setUserGoal(goalAnswer: GoalAnswers, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                pointRepository.setUserGoal(goalAnswer)
                // We're supposed to return the User from here, but `setUserGoal` just returns a boolean
                getUserData(promise)
            } catch (ex: Exception) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun setUserSpecificGoal(specificGoal: SpecificGoalAnswers, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                pointRepository.setUserSpecificGoal(specificGoal)
                // We're supposed to return the User from here, but `setUserGoal` just returns a boolean
                getUserData(promise)
            } catch (ex: Exception) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun getHealthMetrics(
        filter: List<HealthMetricType>,
        workoutId: Int?,
        date: Date?,
        promise: Promise
    ) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val healthMetrics = filter.ifEmpty { HealthMetricType.values().toList() }

                val metrics = pointRepository.getHealthMetrics(healthMetrics, workoutId, date)
                    .map { it.toResponse() }
                    .toReadableArray()

                promise.resolve(metrics)
            } catch (ex: Exception) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun getDailyHistory(offset: Int, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val dailyHistory = pointRepository.getDailyHistory(offset)
                    .map { it.toResponse() }
                    .toReadableArray()

                promise.resolve(dailyHistory)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun getInsights(
        types: List<InsightType>,
        startDate: Date?,
        endDate: Date?,
        offset: Int?,
        promise: Promise
    ) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val insights = pointRepository.getInsights(types, startDate, endDate, offset)
                    .map { it.toResponse() }
                    .toReadableArray()

                promise.resolve(insights)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }

    fun rateWorkout(workoutId: Int, workoutRatings: WorkoutRatings, promise: Promise) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val workout = pointRepository.getWorkout(workoutId)
                val newWorkout = pointRepository.rateWorkout(workout, workoutRatings).toResponse()
                promise.resolve(newWorkout)
            } catch (ex: PointException) {
                promise.reject("PointSDKError", ex.message)
            }
        }
    }
}
