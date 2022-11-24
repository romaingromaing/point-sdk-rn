package com.pointsdkrn

import co.areyouonpoint.pointsdk.domain.model.*
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import java.text.SimpleDateFormat
import java.util.*

fun String.fromIsoStringToDate(): Date {
    val formatter = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
    return formatter.parse(this)!!
}

fun User.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putString("id", id)
        putString("email", email)
        putString("birthday", birthday)
        putString("firstName", firstName)
        putString("goal", goal?.rawValue)
        putMap("goalProgress", goalProgress.toResponse())
        putString("specificGoal", specificGoal?.rawValue)
        putMap("lastWorkout", lastWorkout?.toResponse())
    }

fun Workout.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putInt("id", id)
        putDouble("calories", calories)
        putDouble("distance", distance)
        putDouble("duration", duration)
        putString("start", startDate)
        putString("end", endDate)
        putString("activityName", activityName)
        putIntOrNull("activityId", activityId)
        putMap("ratings", ratings?.toResponse())
    }

fun WorkoutRatings.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putIntOrNull("difficulty", difficulty)
        putIntOrNull("energy", energy)
        putIntOrNull("instructor", instructor)
    }

fun GoalProgress.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putMap("endurance", endurance.toResponse())
        putMap("overall", overall.toResponse())
        putMap("strength", strength.toResponse())
        putMap("recovery", recovery.toResponse())
    }


fun Endurance.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putDouble("value", value)
        putDoubleOrNull("variance", variance)
    }

fun Overall.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putDouble("value", value)
        putDoubleOrNull("variance", variance)
    }

fun Strength.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putDouble("value", value)
        putDoubleOrNull("variance", variance)
    }

fun Recovery.toResponse(): WritableMap =
    Arguments.createMap().apply {
        putDouble("value", value)
        putDoubleOrNull("variance", variance)
    }


fun HealthMetric.toResponse(): ReadableMap =
    Arguments.createMap().apply {
        putString("type", type.rawValue)
        putString("date", date)
        putString("value", value)
        putIntOrNull("variance", variance)
        putIntOrNull("workoutId", workoutId)
    }

fun ReadableArray.toHealthMetricTypes() =
    this.toArrayList().mapNotNull { HealthMetricType.safeValueOf(it.toString()) }

fun DailyHistory.toResponse(): ReadableMap =
    Arguments.createMap().apply {
        putString("date", date)
        putArray("metrics", metrics.map { it.toResponse() }.toReadableArray())
    }

fun <E : ReadableMap> List<E>.toReadableArray(): ReadableArray {
    val response = Arguments.createArray()
    this.forEach { response.pushMap(it) }
    return response
}

fun WritableMap.putIntOrNull(key: String, value: Int?) =
    if (value != null) putInt(key, value) else putNull(key)

fun WritableMap.putDoubleOrNull(key: String, value: Double?) =
    if (value != null) putDouble(key, value) else putNull(key)
