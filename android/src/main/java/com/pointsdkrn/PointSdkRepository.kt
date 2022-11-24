package com.pointsdkrn

import co.areyouonpoint.pointsdk.domain.PointRepository
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.model.HealthMetricType
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
}
