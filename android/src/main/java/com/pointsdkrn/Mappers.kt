package com.pointsdkrn

import co.areyouonpoint.pointsdk.domain.model.*
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

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

fun WritableMap.putIntOrNull(key: String, value: Int?) =
    if (value != null) putInt(key, value) else putNull(key)

fun WritableMap.putDoubleOrNull(key: String, value: Double?) =
    if (value != null) putDouble(key, value) else putNull(key)
